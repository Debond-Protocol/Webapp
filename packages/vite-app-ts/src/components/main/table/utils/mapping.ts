/**
 * Map the global auctions map to table row values
 */
export const mapAuctionToRow = (auctions: any): any[] => {
  const _filters: any[] = [];
  const _values: any[] = [];
  const auctionsMap = new Map<string, any>();
  let idx = 0;
  for (const [_auctionId, auction] of auctions) {
    const infos = {
      key: _auctionId,
      id: _auctionId,
      initialPrice: auction.initialPrice.toString(),
      minimumPrice: auction.minimumPrice.toString(),
      period: auction.duration.toString(),
      faceValue: auction.faceValue.toString(),
      issuanceDate: auction.issuanceTimestamp.toNumber(),
      endDate: { issuanceDate: auction.issuanceTimestamp.toNumber(), duration: auction.duration.toNumber() },

      bid: { id: _auctionId },
    };
    auctionsMap.set(_auctionId as string, infos);
    _values.push(infos);
    idx += 1;
  }
  return [auctionsMap, _filters];
};
