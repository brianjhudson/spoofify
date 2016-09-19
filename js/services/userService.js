spoofifyApp.service('userService', function(){

  var users = [
    {
      id : 8920610,
      firstName : "Ryan",
      lastName : "Thames",
      profileImg : "images/user-img.jpg",
      playlists : [
        {
          plName : "8.27.16",
          id : 1,
          songList : [1152761964, 1053933987, 1053933994]
        },
        {
          plName : "Summer 16",
          id : 2,
          songList : [1152761964, 1053933987, 1053933994, 1053934844, 1053934845, 1053934846, 1053934847, 1053934848, 1053934858, 1053934860, 1053934861, 1053934862, 1053934863, 1053934864]
        },
        {
          plName : "Mix of Drake",
          id : 3,
          songList : [1108737340, 1108737339, 1108737338, 1108737291, 1108737291, 1108737267, 1108737326, 1108737310, 1041818925, 705503646, 705503641, 705503639, 705503635, 705503632, 705503630, 376324876, 376324870, 376324861, 376324859]
        },
        {
          plName : "13.1",
          id : 4,
          songList : [342549635, 342549634, 342549623, 540813190, 540813163, 540813156, 540813067, 540813058, 540813058, 1148215730, 1148215449, 1151620694, 1151620696]
        },
        {
          plName : "Alternative",
          id : 5,
          songList : [205156681, 205156677, 205156673, 205156669, 205156664, 205156660, 205156656, 205156652, 205156649, 205156645, 205156641, 205156632, 1126564431, 1126564430, 1126564429, 1126564428, 1126564427, 1126564426, 1126564425, 1126564424, 1126564423, 1126564422, 1126564267, 329506579, 329506576, 201258939, 201258310, 201257777, 201257739, 201257682, 464823629, 464823639, 1137156167, 1137156214, 1137156274]
        },
        {
          plName : "06",
          id : 6,
          songList : [430477029, 430477030, 430477031, 430477034, 430477035, 430477037, 430477038, 430477039, 485495704, 485495705, 485495706, 485495707, 485495708, 485496549, 485496558, 579373079, 579373080, 579373081, 1154284002, ]
        },
        {
          plName : "Rap",
          id : 7,
          songList : [401264194, 401264195, 401264199, 401264201, 401264203, 401264203, 417910993, 401264208, 401264208, 401264208, 778788832, 778788834, 778788845, 778788846, 778788848, 778788850, 778788861, 752461599, 752461600, 752461606, 752461621]
        },
        {
          plName : "Scream",
          id : 8,
          songList : [276969111, 276969113, 276969114, 265080785, 265080810, 265080951, 265081034, 265081108, 265081326, ]
        },
        {
          plName : "Metal",
          id : 9,
          songList : [579142992, 579142993, 579142994, 579142995, 579142996, 579143000, 579149034, 579149035, 579149036, 579149037, 579149038, 579149039, 579149040, 579149041]
        },
        {
          plName : "The Good \'Ole Days",
          id : 10,
          songList : [132657, 132662, 132664, 132666, 132668, 132670, 132672, 132674, 132676, 1326728, 1326784, 132680, 132682, 132684, 132690, 158815547, 158815583, 158816084, 158816096, 158816130, 158816152, 158816305, 158816462, 169003337, 169003415, 169004107, 169004832, 169005085, 169005529]
        },
        {
          plName : "Classic",
          id : 11,
          songList : [717552718, 717552719, 717552720, 717552721, 717552722, 717552723, 717552724, 717552725, 717552726, 717552727, 717552728, 717552729, 717552730, 717552731, 717552732]
        },
        {
          plName : "Cinema",
          id : 12,
          songList : [944005216, 944005217, 944005218, 944005219, 944005220, 944005221, 944005222, 944005223, 944005224]
        },
        {
          plName : "Christmas Is Here",
          id : 13,
          songList : [669854831, 669854833, 669854834, 669854835, 669854836, 669854837, 669854839, 669854840, 669854843, ]
        }

      ]
    }
  ]

  this.users = users;

});
