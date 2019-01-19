using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ELORating
{
    public class MatchPlayer
    {
        private string summonerName;
        private ELORanking.MatchResult result;
        private bool provisional;
        private double rating;
        private double newRating;

        public double NewRating
        {
            get { return this.newRating; }
            set { newRating = value; }
        }

        public string SummonerName
        {
            get { return this.summonerName; }
            set { summonerName = value; }
        }

        public double Rating
        {
            get { return this.rating; }
            set { rating = value; }
        }

        public bool Provisional
        {
            get { return this.provisional; }
            set { provisional = value; }
        }

        public ELORanking.MatchResult Result
        {
            get { return this.result; }
            set { result = value; }
        }

        public MatchPlayer(string summonerName, double rating)
        {
            this.summonerName = summonerName;
            this.rating = rating;
        }
        public MatchPlayer(string summonerName)
        {
            this.summonerName = summonerName;
           
        }

        public int KValue()
        {
            if (Provisional)//can be deleted after a period of time
                return 32; //25
            else if (Rating > ELORanking.averageRanking)
                return 24; //10
            else
                return 16; //15
        }
    }
}
