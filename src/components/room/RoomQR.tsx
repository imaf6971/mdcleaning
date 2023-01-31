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

  return link !== "" ? <QRCodeSVG value={link} /> : <Spinner />;
}
