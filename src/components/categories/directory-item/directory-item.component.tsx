import { FC } from "react";
import { DirectoryItemContainer, Body, BackgroundImage } from "./directory-item.styles";
import { useNavigate } from "react-router-dom";

type DirectoryItemProps = {
    title: string;
    imageUrl: string;
    route: string;
};

const DirectoryItem: FC<DirectoryItemProps> = ({title, imageUrl, route}) => {
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;