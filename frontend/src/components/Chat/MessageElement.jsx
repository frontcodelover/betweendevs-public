import { dateFormat } from '../../utils/DateFormat.jsx';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

function MessageElement({ receivedMessage, styleMessage, date }) {
  let sanitizeMessage = DOMPurify.sanitize(receivedMessage);

  return (
    <div className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 ${styleMessage?.position}`}>
      <div className='flex flex-col'>
        <span className={styleMessage?.styleMessage}>{parse(sanitizeMessage)}</span>
        <span className={`text-[12px] text-gray-400 ${styleMessage?.dateAlign}`}>{dateFormat(date)}</span>
      </div>
    </div>
  );
}

export default MessageElement;
