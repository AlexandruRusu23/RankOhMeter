using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RiotNet.Tests;
using System.Threading.Tasks;
namespace UnitTestProject1

{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            try
            {
                RiotNet.Tests.SummonerTests test = new RiotNet.Tests.SummonerTests();
                //TestBase test = new SummonerTests();63970147
                test.TestOneTimeSetUp().Wait();

                string id = test.encryptedSummonerId;

                test.GetLeagueAsyncTest(id).Wait();
                
                 

            }

            catch(Exception ex)
            {
                string message = ex.InnerException.Message;
            }
        }
    }
}
