import typing from '../sound/typing.mp3';

export const todo = {
	typing: typing,
};

export const audio = (path) => {
	const sound = new Audio(todo[path]);
	return sound;
};
