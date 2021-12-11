import React, {
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { storeState } from '../../../../store/reducers';
import Message from '../Message/Message';
import { useDispatch } from 'react-redux';

import { audio } from '../../../../assets/sound/audio';
import { paginateMessage } from '../../../../store/actions/chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const MessageBox = ({
	currentChat,
	store = storeState,
}) => {
	//store
	const { user } = store.authReducer;
	const { scrollBottom, senderTyping } = store.chatReducer;
	const [onlyFirst, setOnlyFirst] = useState(false);
	// audio
	const sound = audio('typing');
	const msgBox = useRef();
	let checker = useRef(sound);
	//state
	const [loading, setLoading] = useState(false);
	const [scrollUp, setScrollUp] = useState(0);

	const dispatch = useDispatch();
	// callback
	const scrollManual = (value) => {
		msgBox.current.scrollTop = value;
	};
	// sound typing
	useMemo(() => {
		if (!senderTyping.typing) {
			setOnlyFirst(false);
		}
	}, [senderTyping.typing]);
	const HandleTyping = () => {
		if (
			senderTyping.typing &&
			senderTyping.chatId === currentChat.id
		) {
			sound.pause();
			clearTimeout(checker.current);
			checker.current = setTimeout(() => {
				sound.play();
			}, 800);
			if (!onlyFirst) {
				sound.play();
				setOnlyFirst(true);
			}
			return true;
		} else {
			sound.pause();
			return false;
		}
	};

	// open and scoll boottom
	useEffect(() => {
		if (!senderTyping.typing) {
			setTimeout(() => {
				scrollManual(msgBox.current.scrollHeight);
			}, 50);
		}
	}, [scrollBottom]);

	// scroll top pagination page

	useEffect(() => {
		if (scrollUp !== 0) {
			setTimeout(() => {
				scrollManual(
					Math.ceil(msgBox.current.scrollHeight * 0.2)
				);
			}, 400);
		}
	}, [scrollUp]);

	// 1/3 scroll bootoom
	useEffect(() => {
		if (
			senderTyping.typing &&
			msgBox.current.scrollTop >
				msgBox.current.scrollHeight * 0.3
		) {
			scrollManual(msgBox.current.scrollHeight);
		}
	}, [senderTyping]);

	const handleInfinititeScroll = (e) => {
		if (e.target.scrollTop === 0) {
			setLoading(true);
			const pagination = currentChat.Pagination;
			const page =
				typeof pagination === 'undefined'
					? 1
					: pagination.page;

			dispatch(
				paginateMessage(currentChat.id, parseInt(page) + 1)
			)
				.then((res) => {
					if (res) {
						setScrollUp(scrollUp + 1);
					}
					setTimeout(() => {
						setLoading(false);
					}, 400);
				})
				.catch(() => {
					setLoading(false);
				});
		}
	};

	return (
		<div
			onScroll={handleInfinititeScroll}
			id="msg-box"
			ref={msgBox}
		>
			{loading ? (
				<FontAwesomeIcon
					icon="spinner"
					className="fa-spin"
				/>
			) : null}
			{currentChat.Messages.map((message, index) => {
				return (
					<Message
						key={index}
						user={user}
						currentChat={currentChat}
						message={message}
						index={index}
					/>
				);
			})}

			{HandleTyping() ? (
				<>
					<div
						className="message "
						style={{ marginTop: '5px' }}
					>
						<div className="other-person">
							<div className="m-0 typing">
								<div>
									{senderTyping.fromUser.firstName}{' '}
									{senderTyping.fromUser.lastName}
								</div>

								<div id="typing">
									<div className="dot1"></div>
									<div className="dot2"></div>
									<div className="dot3"></div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				''
			)}
		</div>
	);
};
export default MessageBox;
