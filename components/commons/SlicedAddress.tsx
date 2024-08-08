const SlicedAddress = ({ address }: { address: string }) => {
  return <p>{address?.slice(0, 6) + "..." + address?.slice(38, 42)}</p>;
};

export default SlicedAddress;
