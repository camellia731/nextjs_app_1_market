import Image from "next/image";
import Link from "next/link";

const getSingleItem = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`
  );
  const jsonData = await response.json();
  //console.log(jsonData);
  const singleItem = jsonData.singleItem;
    return singleItem;
};

const ReadSingleItem = async(context) => {
  const singleItem = await getSingleItem(context.params.id);
  return (
    <div className="grid-cionttainer-si">
        <div>
            <Image
                src={singleItem.image}
                alt="item image"
                width={750}
                height={500}
                priority
            />  
        </div>
        <div>
            <h2>{singleItem.name}</h2>
            <p>{singleItem.price}</p>
            <hr />
            <p>{singleItem.description}</p>
            <div>
                <Link href={`/item/update/${singleItem._id}`}>
                    <button>編集</button>
                </Link>
                <Link href={`/item/delete/${singleItem._id}`}>
                    <button>削除</button>
                </Link>
            </div>
        </div>
    </div>
  );
};

export default ReadSingleItem;
