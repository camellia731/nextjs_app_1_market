import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <Image
            src="/header.svg"
            alt="logo"
            width={1330}
            height={140}
            priority
          />
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/user/register">登録</Link>
            </li>
            <li>
              <Link href="/user/login">ログイン</Link>
            </li>
            <li>
              <Link href="/item/create">アイテム作成</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
