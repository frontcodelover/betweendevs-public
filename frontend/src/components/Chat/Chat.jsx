import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { BsSend, BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CorfirmModal from './ConfirmModal';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import quillEmoji from 'react-quill-emoji';
import 'react-quill-emoji/dist/quill-emoji.css';
import MessageElement from './MessageElement';
import DOMPurify from 'dompurify';

const socket = io(`${import.meta.env.VITE_URL_API}`);

function Chat({ users, senderId, recieverId, matchId }) {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [receiverInfos, setReceiverInfos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [sendedMessage, setSendedMessage] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesRef = useRef(null);
  const navigate = useNavigate();

  const senderStyle = {
    position: 'items-end',
    styleMessage: 'px-4 py-2 rounded-lg inline-block rounded-tr-none bg-indigo-600 text-white',
    dateAlign: 'text-right',
  };

  const receiverStyle = {
    position: 'items-start',
    styleMessage: 'px-4 py-2 rounded-lg inline-block rounded-tl-none bg-gray-200 text-gray-600',
    dateAlign: 'text-left',
  };

  const modules = {
    toolbar: {
      container: [['bold', 'italic', 'underline', 'code']],
    },
    'emoji-toolbar': true,
    'emoji-textarea': true,
    'emoji-shortname': true,
  };

  const formats = ['header', 'bold', 'italic', 'underline', 'code', 'emoji'];

  Quill.register(
    {
      'formats/emoji': quillEmoji.EmojiBlot,
      'modules/emoji-toolbar': quillEmoji.ToolbarEmoji,
      'modules/emoji-textarea': quillEmoji.TextAreaEmoji,
      'modules/emoji-shortname': quillEmoji.ShortNameEmoji,
    },
    true,
  );

  function sendMessage(e) {
    e.preventDefault();
    let sanitizeMessage = DOMPurify.sanitize(message);
    const data = {
      message: sanitizeMessage,
      senderId: senderId,
      receiverId: recieverId,
      matchId: matchId,
      date: new Date().toISOString(),
    };

    setMessage('');
    socket.emit('joinRoom', `match_${matchId}`);
    socket.emit('sendMessageToRoom', { room: `match_${matchId}`, data });
  }

  async function getMessages() {
    const response = await axios.get(`${import.meta.env.VITE_URL_API}/messages/${matchId}`);
    setAllMessages(response.data);
    setLoaded(true);
  }

  async function getInfosReciever() {
    const response = await axios.get(`${import.meta.env.VITE_URL_API}/one-user/${recieverId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setReceiverInfos(response.data[0]);
  }

  async function blockMatch() {
    try {
      const response = await axios.put(`${import.meta.env.VITE_URL_API}/block-match/${matchId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        navigate('/app/matches');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function confirmBlock(e) {
    e.preventDefault();
    setShowModal(true);
  }

  function handleShowMenu() {
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    getInfosReciever();
    socket.on('message', (data) => {
      setAllMessages((prevMessages) => [...prevMessages, data]);
    });

    // Sent firt connection to the room to get the first message
    socket.emit('joinRoom', `match_${matchId}`);
    getMessages();

    return () => {
      socket.off('message');
    };
  }, [matchId, loaded]);

  useEffect(() => {
    if (sendedMessage.length !== allMessages.length) {
      messagesRef.current.scrollIntoView();
    }
    setSendedMessage(allMessages);
    if (confirmDelete) {
      blockMatch();
    }
  }, [allMessages, sendedMessage, confirmDelete]);

  return (
    <div className='max-w-screen-xl m-auto relative min-h-[85vh]'>
      <div className='top-[10vh] text-xl flex-1 flex items-center justify-between pl-8 pr-8 md:pr-0 md:pl-0 mt-0  border-b py-6 fixed w-full max-w-screen-xl bg-white translate-x-1/2 right-1/2'>
        <div className='font-semibold text-base sm:text-lg md:text-lg text-gray-900 mr-3 md:px-8 xl:p-0'>Discussion avec {receiverInfos?.pseudo}</div>
        <div className='flex flex-col relative items-end max-w-xl'>
          <button className='bg-white hover:border-none border-none focus:outline-none relative' onClick={handleShowMenu}>
            <BsThreeDotsVertical />
          </button>
          {showMenu && (
            <div className='flex flex-col text-sm absolute text-right top-10 right-6 md:w-auto rounded-xl border border-gray-50 shadow-xl z-10 pr-3 pl-6 py-3 bg-white'>
              <Link to={`/app/match/profil/${recieverId}`} className='bg-white text-gray-900 hover:text-indigo-600 cursor-pointer py-2 px-2 w-full'>
                <span>Voir la fiche </span>
              </Link>
              <div onClick={confirmBlock} className='bg-white text-gray-900 hover:text-indigo-600 cursor-pointer py-2 px-2 font-semibold'>
                <span>Bloquer l'utilisateur</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && <CorfirmModal isOpen={showModal} onClose={() => setShowModal(false)} setConfirmDelete={setConfirmDelete} />}
      <div className='flex sm:items-center justify-between py-3 mb-3'>
        <div className='flex items-center gap-3 w-full'>
          <div id='all_messages' className='w-full flex px-3 flex-col space-y-4 p-3 mb-40  mt-[10vh]'>
            {allMessages.map((message) => {
              return message.senderId === senderId ? (
                <div className='flex items-start justify-end' key={message._id}>
                  <div>
                    <MessageElement receivedMessage={message.message} date={message.date} styleMessage={senderStyle} />
                  </div>
                  <img src={users[0]?.picture} alt={users[0]?.pseudo} className='w-7 h-7 rounded-full order-2 object-cover' />
                </div>
              ) : (
                <div className='flex items-start' key={message._id}>
                  <div className='order-2'>
                    <MessageElement receivedMessage={message.message} date={message.date} styleMessage={receiverStyle} />
                  </div>
                  <img src={receiverInfos?.picture} alt={receiverInfos?.pseudo} className='w-7 h-7 rounded-full order-1 object-cover' />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='absolute w-full bottom-0'>
        <div className='flex gap-5 pt-8 mt-3' ref={messagesEndRef}>
          <ReactQuill
            theme='snow'
            value={message}
            onChange={setMessage}
            modules={modules}
            formats={formats}
            className='w-full max-h-[105px] rounded-md py-1.5 mb-9 pl-2 text-gray-900 sm:text-sm sm:leading-6'
          />
          <div className='flex h-12 mt-24'>
            <button type='button' onClick={sendMessage} className='rounded-lg py-3 transition duration-500 ease-in-out text-white bg-indigo-600 hover:bg-indigo-500 '>
              <span className='text-xl'>
                <BsSend />
              </span>
            </button>
            <div ref={messagesRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
