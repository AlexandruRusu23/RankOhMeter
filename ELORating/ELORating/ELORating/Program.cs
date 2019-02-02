using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RiotNet.Converters;
using RiotNet.Models;

namespace ELORating
{
    class Program
    {
        static void Main(string[] args)

        {
            //Full test
            double newRanking;
            double currentRanking = 1234;
            double provisionalRanking;
            string pathTokey = @"C:\Users\andreea.rentea\Documents\Visual Studio 2015\Projects\ELORating\key.txt";

           ELOClient client = new ELOClient();
           string tierout = client.readSeedData("TossThoseDigits2");//given a summoner name, read from seed data

           DataPlayer datagame = new DataPlayer(1149, 1150, 1499, 1500, 1849, 1850, 2199, 2200, 2499, 2500, 2999);//limits for ranking
            
            if(tierout == null || tierout.ToLower() == "unranked")
            {
                provisionalRanking = client.calculateProvisionalElo("TossThoseDigits2", 0, datagame);
                currentRanking = provisionalRanking;
            }
            
            //create teams
            Hashtable htAllies = new Hashtable();

            htAllies.Add("TossThoseDigits2", currentRanking);
            htAllies.Add("141Masters", 1290);
            htAllies.Add("Pheejhmoo", 1232);
            htAllies.Add("DUNKNGOHAMZIES", 1289);
            htAllies.Add("YABO2", 1700);


            Hashtable htOpponents = new Hashtable();
            htOpponents.Add("TheMuffinMan97", 1567);
            htOpponents.Add("GXuanMing", 1800);
            htOpponents.Add("vampiresland", 1100);
            htOpponents.Add("XxlivewirexX", 1311);
            htOpponents.Add("Molegg", 1200);

            //calculate elo after match
            newRanking = client.calculateElo("141Masters", currentRanking, "win", htAllies,htOpponents);


            ConstantAdjustments consta = new ConstantAdjustments();
             string adjustments = consta.AdjustMethod("TossThoseDigits2", "platinum",1450, pathTokey); // adjust upper and lower limits; output: the name of the 


        }
    }
}
