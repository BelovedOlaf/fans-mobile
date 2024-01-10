import React, { FC } from "react";

interface Props {
	visible: boolean;
	children: React.ReactNode;
}

const FypNullableView: FC<Props> = (props) => {
	const { visible, children } = props;
	return visible ? children : null;
};

export default FypNullableView;
