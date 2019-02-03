using System;
using System.Collections.Generic;
using RiotNet;
using RiotNet.Models;
using System.Threading.Tasks;

namespace ELORating
{
    public class SummonerRank : GetRankRiotApi
    {
        public string encryptedSummonerId;
        public string encryptedAccountId;
        public string encryptedPuuid;
        public List<LeaguePosition> league;

        public SummonerRank(string pathTokey) : base(pathTokey)
        {
        }

        public async Task GetSummonerInfo(string summonerName)
        {
            SetRiotClientSettings();
            IRiotClient client = new RiotClient();
            var summoner = await client.GetSummonerBySummonerNameAsync(summonerName);
            encryptedSummonerId = summoner.Id;
            encryptedAccountId = summoner.AccountId;
            encryptedPuuid = summoner.Puuid;

        }

        public async Task GetLeagueAsync(string id)
        {
            IRiotClient client = new RiotClient();
            league = await client.GetLeaguePositionsBySummonerIdAsync(id);

        }
    }
}
