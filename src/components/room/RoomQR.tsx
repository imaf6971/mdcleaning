import Spinner from "@/ui/Spinner";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

type RoomQRProps = {
  roomId: number;
};

export default function RoomQR({ roomId }: RoomQRProps) {
  const [link, setLink] = useState("");

  // window is undefined on server
  // using useEffect to setLink on component mount
  useEffect(() => {
    setLink(`${window.location.origin}/room/${roomId}/review/`);
  }, [roomId]);

  return (
    <div className=" flex justify-center">
      {link !== "" ? (
        <QRCodeSVG
          className="h-1/2 w-1/2 md:h-1/3 md:w-1/3"
          level="H"
          value={link}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
