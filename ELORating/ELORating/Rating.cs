using System;
using System.Collections.Generic;


namespace ELORating
{
    public class Rating
    {
        //to do: create for more players/teams: idea-> sum up rating/adjust rating to be similar for all players/drop out K?
        //to do: review and rewrite code

        //constants for ELO formula
        private const int KFACTOR = 15;// to do: dynamic K; ussually it's 25; a pro k-factor is 10. In chess competitions, when you reach pro, k-factor never changes(rating = 2400)

        //scores
        public const double WIN = 1;
        public const double LOSE = 0;
        public const double DRAW = 0.5;

        //data about player A and player B
        double _ratingA;
        double _ratingB;

        double _scoreA;
        double _scoreB;

        double _expectedA;
        double _expectedB;

        double _newRatingA;
        double _newRatingB;


        //set data for each player taken from API or database
        public Rating(double ratingA, double ratingB, double scoreA, double scoreB)
        {
            SetNewSettings(ratingA, ratingB, scoreA, scoreB);
        }
        

        /*set data new object rating*/
        public Rating SetNewSettings(double ratingA, double ratingB, double scoreA, double scoreB)
        {
            _ratingA = ratingA;
            _ratingB = ratingB;
            _scoreA = scoreA;
            _scoreB = scoreB;

            List<double> expectedScores = calcExpectedScores(_ratingA, _ratingB);
            _expectedA = expectedScores[0];
            _expectedB = expectedScores[1];

            List<double> newRatingsList = calcNewRatings(_ratingA, _ratingB, _expectedA, _expectedB, _scoreA, _scoreB);
            _newRatingA = newRatingsList[0];
            _newRatingB = newRatingsList[1];

            return this;
        }

        //get data after match about players
        public List<double> GetNewRatings()
        {
            List<double> newRatingsList = new List<double>
            {
                _newRatingA,
                _newRatingB
            };

            return newRatingsList;
        }

        //calculate expected scores for each player(how much draw, how much win, how much lose)
        List<double> calcExpectedScores(double ratingA, double ratingB)
        {
            double expectedScoreA = 1 / (1 + (Math.Pow(10, (ratingB - ratingA) / 400)));//400 can be modified to better suit the results
            double expectedScoreB = 1 / (1 + (Math.Pow(10, (ratingA - ratingB) / 400)));


            //save scores in list
            List<double> expectedScoresList = new List<double>
            {
                expectedScoreA,
                expectedScoreB
            };

            return expectedScoresList;
        }

        //
        List<double> calcNewRatings(double ratingA, double ratingB, double expectedA, double expectedB, double scoreA, double scoreB)
        {
            double newRatingA = ratingA + (KFACTOR * (scoreA - expectedA));
            double newRatingB = ratingB + (KFACTOR * (scoreB - expectedB));

            //save ratings in list
            List<double> newRatingList = new List<double>
            {
                newRatingA,
                newRatingB
            };

            return newRatingList;
        }
    }
}
