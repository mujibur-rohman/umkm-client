import { Badge } from "@mantine/core";

export const statusPayment = (status) => {
  switch (status) {
    case 0:
      return <Badge color="red">Belum Bayar</Badge>;
    case 1:
      return <Badge color="green">Sudah Bayar</Badge>;
    default:
      return "Status Tidak Valid";
  }
};

export const statusDelivery = (status) => {
  switch (status) {
    case 0:
      return <Badge color="red">Belum Dikirim</Badge>;
    case 1:
      return <Badge color="lime">Sedang Dikemas</Badge>;
    case 2:
      return <Badge color="yellow">Sedang Dikirim</Badge>;
    case 3:
      return <Badge color="green">Sudah Diterima</Badge>;
    default:
      return "Status Tidak Valid";
  }
};
