import { QRCodeSVG } from "qrcode.react";

type RoomQRProps = {
  roomId: number;
};

export default function RoomQR({ roomId }: RoomQRProps) {
  const link = `${window.location.origin}/room/${roomId}/review/`;

  return <QRCodeSVG value={link} />;
}
