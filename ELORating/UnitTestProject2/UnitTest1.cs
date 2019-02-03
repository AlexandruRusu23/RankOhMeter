using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RiotNet.Tests;
using System.Threading.Tasks;


namespace UnitTestProject2
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            SummonerTests test = new SummonerTests();
           Task test1 = test.TestOneTimeSetUp();
        }
    }
}
