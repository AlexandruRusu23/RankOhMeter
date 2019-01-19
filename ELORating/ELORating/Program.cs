using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ELORating
{
    class Program
    {
        static void Main(string[] args)
        {
            //create match
            Rating myRating = new Rating(1278, 1392, Rating.LOSE, Rating.WIN);
            myRating.GetNewRatings();

            //test 1
            MatchPlayer alex = new MatchPlayer("alex", 643);
            MatchPlayer xyz = new MatchPlayer("xyz", 2742);
            MatchPlayer asdas = new MatchPlayer("asdas");


            ELORanking game1 = new ELORanking(3);
            alex.Result = ELORanking.MatchResult.Win;
            xyz.Result = ELORanking.MatchResult.Lose;
            asdas.Result = ELORanking.MatchResult.Win;

            game1.Matchup.Add(alex);
            game1.Matchup.Add(xyz);
            game1.Matchup.Add(asdas);
            double asdass = asdas.Rating;

            double newRankingAlex = game1.CalculateNewRatingForPlayer(alex);
            double newRankingxyz = game1.CalculateNewRatingForPlayer(xyz);
            double newRankingasdas = game1.CalculateNewRatingForPlayer(asdas);
            alex.Rating = alex.NewRating;
            double tier = DataPlayer.getRatingBasedOnHighestTierAchieved("bronze");


            //test 2
            ELOClient client = new ELOClient();
            client.readSeedData("TheMuffinMan97");

            //test 3
            // if ranking = null
            double Ranking= client.calculateProvisionalElo("TheMuffinMan97", 0);

            //test 4
            Hashtable ht1 = new Hashtable();

            ht1.Add("TheMuffinMan97", "1234");
            

            Hashtable ht2 = new Hashtable();
            ht2.Add("Molegg", "2311");

            newRankingAlex = client.calculateElo("141Masters", 1222, "win", ht1,ht2);
          


            //for provisional
            /*
             * DataPlayer:getDivision(Database) -> if not found -> getLatest Division(Fetchy) -> add an initial base|
             *                                          
             */

            // get data from last 10 matches: summnonerName, rating, outcome, Matches[10] matches -> to be implemented

            /* for each match that the player has participated
              
             ELORanking game = new ELORanking(10);
             MatchPlayer opponents

            foreach(player in players)
            {   
                  game.Matchup.Add(player)
            }

            if outcome = LOST => foreach(player in opponents)
                                {
                                        player.Result = ELORating.MatchResult.Win;  
                                }
             else...

            newRating = game.CalculateNewRatingForPlayer(summnonerName);
            
            */

        }
    }
}
