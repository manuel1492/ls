import { Boom } from '@hapi/boom'
import NodeCache from 'node-cache'
import makeWASocket, { AnyMessageContent, delay, DisconnectReason, fetchLatestBaileysVersion, getAggregateVotesInPollMessage, makeCacheableSignalKeyStore, makeInMemoryStore, proto, useMultiFileAuthState, WAMessageContent, WAMessageKey } from '../src'
import MAIN_LOGGER from '../src/Utils/logger'
import * as cp from 'child_process'

const logger = MAIN_LOGGER.child({ })
logger.level = 'trace'
const useStore = !process.argv.includes('--no-store')
const doReplies = !process.argv.includes('--no-reply')
const ignoredNumbers = ['521xxxxxxxxxx', '11xxxxxxxxxx']
const msgRetryCounterCache = new NodeCache()
const store = useStore ? makeInMemoryStore({ logger }) : undefined
store?.readFromFile('./baileys_store_multi.json')
setInterval(() => {
  store?.writeToFile('./baileys_store_multi.json')
}, 10_000)
// Define el número máximo de procesos simultáneos, por defecto es 1
// Defines the maximum number of simultaneous processes, by default it is 1
const maxProcesses = 1;

let currentProcesses = 0; // Several processes are currently started
const startSock = async() => {
  const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info')
  // fetch latest version of WA Web
  const { version, isLatest } = await fetchLatestBaileysVersion()
  console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

  const sock = makeWASocket({
    version,
    logger,
    printQRInTerminal: true,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    msgRetryCounterCache,
    generateHighQualityLinkPreview: true,
    getMessage,
  })

  store?.bind(sock.ev)

  const sendMessageWTyping = async(msg: AnyMessageContent, jid: string) => {
    await sock.presenceSubscribe(jid)
    await delay(500)

    await sock.sendPresenceUpdate('composing', jid)
    await delay(2000)

    await sock.sendPresenceUpdate('paused', jid)

    await sock.sendMessage(jid, msg)
  }
  sock.ev.process(
    async(events) => {
      if(events['connection.update']) {
        const update = events['connection.update']
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
          if((lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
            startSock()
          } else {
            console.log('Connection closed. You are logged out.')
          }
        }

        console.log('connection update', update)
      }
      if(events['creds.update']) {
        await saveCreds()
      }

      if(events.call) {
        console.log('recv call event', events.call)
      }

      // history received
      if(events['messaging-history.set']) {
        const { chats, contacts, messages, isLatest } = events['messaging-history.set']
        console.log(`recv ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest})`)
      }

// received a new message
if (events['messages.upsert']) {
  const upsert = events['messages.upsert']
  console.log('recv messages ', JSON.stringify(upsert, undefined, 2))

  if (upsert.type === 'notify') {
    for (const msg of upsert.messages) {
if (
      !msg.key.fromMe &&
      msg.message &&
      msg.message.conversation &&
      msg.message.conversation.startsWith('!') && // solo responder si el mensaje comienza con "!"
      doReplies
    ) {

      if (currentProcesses < maxProcesses) {
        console.log('replying to', msg.key.remoteJid)
        await sock!.readMessages([msg.key])
        const escapedConversation = msg.message.conversation.slice(1).replace(/"/g, '\\"');

        cp.exec(
          `/app/llama.cpp/main -m /app/llama.cpp/ggml-vicuna-7b-1.1-q4_0.bin -p "Contexto: Eres un asistente llamado Laurent, laurent es amable, laurent solo escribe lo que el usuario le pidió, laurent es preciso con su respuesta. User:${escapedConversation}. Assistant:" -n 500`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);

            // extract the message after "Assistant:"
            const regex = /Assistant:(.*)/s;
            const match = regex.exec(stdout);
            let response;
            if (match && match[1]) {
              response = match[1].trim();
            } else {
              response = 'No se pudo entender la respuesta del asistente';
            }
            sendMessageWTyping({ text: response }, msg.key.remoteJid!);

            currentProcesses--; // Disminuir el número de procesos en uno después de ejecutar un comando
          }
        );

        currentProcesses++; // Después de iniciar un proceso de comando, aumente el número de procesos en uno
      } else {
        const waitingMessage = "El asistente está ocupado procesando la solicitud de otro usuario, por favor intentalo más tarde.\n\nThe wizard is busy processing another user's request, please try again later.";
        sendMessageWTyping({ text: waitingMessage }, msg.key.remoteJid!);
      }
    }
  }
}
      }

      if(events['messages.update']) {
        console.log(
          JSON.stringify(events['messages.update'], undefined, 2)
        )

        for(const { key, update } of events['messages.update']) {
          if(update.pollUpdates) {
            const pollCreation = await getMessage(key)
            if(pollCreation) {
              console.log(
                'got poll update, aggregation: ',
                getAggregateVotesInPollMessage({
                  message: pollCreation,
                  pollUpdates: update.pollUpdates,
                })
              )
            }
          }
        }
      }

      if(events['message-receipt.update']) {
        console.log(events['message-receipt.update'])
      }

      if(events['messages.reaction']) {
        console.log(events['messages.reaction'])
      }

      if(events['presence.update']) {
        console.log(events['presence.update'])
      }

      if(events['chats.update']) {
        console.log(events['chats.update'])
      }

      if(events['contacts.update']) {
        for(const contact of events['contacts.update']) {
          if(typeof contact.imgUrl !== 'undefined') {
            const newUrl = contact.imgUrl === null
              ? null
              : await sock!.profilePictureUrl(contact.id!).catch(() => null)
            console.log(
              `contact ${contact.id} has a new profile pic: ${newUrl}`,
            )
          }
        }
      }

      if(events['chats.delete']) {
        console.log('chats deleted ', events['chats.delete'])
      }
    }
  )

  return sock

  async function getMessage(key: WAMessageKey): Promise<WAMessageContent | undefined> {
    if(store) {
      const msg = await store.loadMessage(key.remoteJid!, key.id!)
      return msg?.message || undefined
    }

    // only if store is present
    return proto.Message.fromObject({})
  }
}

startSock()
