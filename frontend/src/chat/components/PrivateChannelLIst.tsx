import { Channel } from '@/type/chatType';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SocketContext } from '@/context/socket';

const PrivateChannelList = ({channelList }: {channelList: Channel[]}) => {
  const router = useRouter();
  const { chatNamespace } = useContext(SocketContext);
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');

  const handlePrivateChannelSelect = (channel: Channel) => {
    const seletedChannel = channelList.find(ch => ch.id === channel.id);
    if (!seletedChannel) return;
    const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isUserInChannel = seletedChannel.userList.some((user) => user.intraId === loggedInUser.intraId);

    if (!isUserInChannel) {
      alert('없는채널 입니다.');
      return ;
    }
    chatNamespace.emit('chat-join-channel', { channelId: seletedChannel.id });
    router.push(`/chat/${seletedChannel.id}`);
  };

  return (
    <div>
      <h3>Private Channel</h3>
      <ul>
        {
          channelList.map((channel) => (
            channel.channelType === 'private' && 
            channel.userList.some(() => {
              const tempUsers = channel.title.split(':');
              if (tempUsers[0] === loggedInUser.intraId || tempUsers[1] === loggedInUser.intraId) {
                return true;
              }
            })
        &&
        <li key={channel.id} style={{ cursor: 'pointer' }}>
          <span onClick={() => handlePrivateChannelSelect(channel)}>{channel.title}</span>
        </li>
          ))
        }
      </ul>
    </div> );
};

export default PrivateChannelList;