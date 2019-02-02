using NUnit.Framework;
using RiotNet.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace RiotNet.Tests
{
    [TestFixture]
    public class SummonerTests : TestBase
    {
       public string encryptedSummonerId;
       public string encryptedAccountId;
       public string encryptedPuuid;
       public List<LeaguePosition> league;

        [OneTimeSetUp]
        public async Task TestOneTimeSetUp()
        {
            SetRiotClientSettings();
            IRiotClient client = new RiotClient();
            var summoner = await client.GetSummonerBySummonerNameAsync("TossThoseDigits2");
            encryptedSummonerId = summoner.Id;
            encryptedAccountId = summoner.AccountId;
            encryptedPuuid = summoner.Puuid;
            
        }

        [Test]
        public async Task GetSummonerByAccountIdAsyncTest()
        {
            IRiotClient client = new RiotClient();
            Summoner summoner = await client.GetSummonerByAccountIdAsync(encryptedAccountId);

            AssertNonDefaultValuesRecursive(summoner);
        }

        [Test]
        public async Task GetSummonerBySummonerIdAsyncTest()
        {
            IRiotClient client = new RiotClient();
            Summoner summoner = await client.GetSummonerBySummonerIdAsync(encryptedSummonerId);

            AssertNonDefaultValuesRecursive(summoner);
        }

        [Test]
        public async Task GetSummonerBySummonerNameAsyncTest()
        {
            RiotClient client = new RiotClient();

            Summoner summoner = await client.GetSummonerBySummonerNameAsync("taylor333");

            AssertNonDefaultValuesRecursive(summoner);
        }

        [Test]
        public async Task GetSummonerByPuuidAsyncTest()
        {
            IRiotClient client = new RiotClient();
            Summoner summoner = await client.GetSummonerByPuuidAsync(encryptedPuuid);

            AssertNonDefaultValuesRecursive(summoner);
        }

        
        public async Task GetLeagueAsyncTest(string id)
        {
            IRiotClient client = new RiotClient();
            //Summoner summoner = await client.GetSummonerByPuuidAsync(id);
            league = await client.GetLeaguePositionsBySummonerIdAsync(id);

            //return leagues;
            //AssertNonDefaultValuesRecursive(summoner);
        }
    }
}
