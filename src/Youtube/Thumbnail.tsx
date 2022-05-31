export default function Thumbnail({src}:{src:any}) {
    return (
        <>
            <img width={src.width} height={src.height} src={src.url} />
        </>
    )
}