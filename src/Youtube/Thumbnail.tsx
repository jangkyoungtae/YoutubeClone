interface IThumbnail{
    url: string,
    width: string,
    height: string
}

export default function Thumbnail({ src }: { src: IThumbnail }) {
    return (
        <img width={src.width}  height = {src.height} src={src.url} />
    )
}