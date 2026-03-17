export default function ProductImage({item}) {
    return (
        <div className="w-[82px] h-[82px] mb-4">
            <img className="w-full h-full object-cover" src={item} alt="item" />
        </div>
    );
}