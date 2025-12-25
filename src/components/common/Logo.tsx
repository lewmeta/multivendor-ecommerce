import Image from "next/image";

import LogoImg from "../../../public/assets/icons/logo-1.png";

interface LogoProps {
    width: string;
    height: string;
};

const Logo: React.FC<LogoProps> = ({ width, height }) => {
    return (
        <div className="z-[50]" style={{ width: width, height: height }}>
            <Image src={LogoImg} alt="Logo" className="h-full w-full overflow-visible object-cover" />
        </div>
    );
};

export default Logo;