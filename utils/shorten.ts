export const shortenAddress = (address: string) => {
  if (address?.length < 13) return address;
  return `${address?.substring(0, 8)}...${address?.substring(
    address?.length - 4,
    address?.length
  )}`;
};

export const shortenHash = (hash: string) => {
  if (hash?.length < 13) return hash;
  return `${hash?.substring(0, 12)}...`;
};
