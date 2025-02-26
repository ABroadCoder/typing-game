'use strict';

// HTML Element References

const outerContainer = document.querySelector('.outer-container');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const letterBox1 = document.querySelector('.letter-box-1');
const letterBox2 = document.querySelector('.letter-box-2');
const letterBox3 = document.querySelector('.letter-box-3');
const incomingContainer = document.querySelector('.incoming-container');
const commandLine = document.querySelector('.command-line');

// Variable Definitions

let letterGroup = 0;
let currentStep = 0;
let gameMode = 'single-letter';

let letters = [
  ['F', 'J', 'R', 'U'],
  ['K', 'D', 'E', 'I', 'C'],
  ['G', 'H', 'T', 'Y'],
  ['V', 'B', 'N', 'M'],
  ['S', 'W', 'L', 'O', 'X'],
  ['A', 'Q', 'Z', 'P'],
];

// const dialogue = [
//   {
//     m: `Hey! Are you awake?`,
//     answers: {
//       first: { text: `Yes.`, next: 1 },
//       second: { text: `No.`, next: 2 },
//       third: { text: `(Remain silent.)`, next: 3 },
//     },
//   },
//   {
//     m: `Great! How are you feeling?`,
//     answers: {
//       first: { text: `Perfect.`, next: 4 },
//       second: { text: `Alright.`, next: 5 },
//       third: { text: `Terrible.`, next: 6 },
//     },
//   },
//   {
//     m: `Haha, I like your sense of humor. How are you feeling?`,
//     answers: {
//       first: { text: `Perfect.`, next: 4 },
//       second: { text: `Alright.`, next: 5 },
//       third: { text: `Terrible.`, next: 6 },
//     },
//   },
//   {
//     m: `Hello? Can you hear me?`,
//     answers: {
//       first: { text: `Yes, I'm awake.`, next: 1 },
//       second: { text: `No, I'm not awake.`, next: 2 },
//       third: { text: `(Remain silent.)`, next: 3 },
//     },
//   },
// ];

const dialogue = [
  {
    index: 0,
    m: `Hello! What's your name?`,
    answers: {
      first: { text: `Call me "Stranger".`, next: 1 },
      second: { text: `I have a name.`, next: 2 },
      third: { text: `It's a secret.`, next: 3 },
    },
  },
  {
    index: 1,
    m: `Nice to meet you, Stranger. What brings you here?`,
    answers: {
      first: { text: `Looking for work.`, next: 4 },
      second: { text: `Just visiting.`, next: 5 },
      third: { text: `Exploring.`, next: 6 },
    },
  },
  {
    index: 2,
    m: `Great! What's your name?`,
    answers: {
      first: { text: `Call me "Rogue".`, next: 7 },
      second: { text: `Call me "Cipher".`, next: 8 },
      third: { text: `Call me "Ghost".`, next: 9 },
    },
  },
  {
    index: 3,
    m: `Keeping it a secret, huh? What do you like to do?`,
    answers: {
      first: { text: `Explore new places.`, next: 10 },
      second: { text: `Meet new people.`, next: 11 },
      third: { text: `Learn new things.`, next: 12 },
    },
  },
  {
    index: 4,
    m: `Looking for work? What kind of work do you do?`,
    answers: {
      first: { text: `I can fix things.`, next: 13 },
      second: { text: `I can help people.`, next: 14 },
      third: { text: `I can keep secrets.`, next: 15 },
    },
  },
  {
    index: 5,
    m: `Just visiting? What do you want to see here?`,
    answers: {
      first: { text: `The big buildings.`, next: 16 },
      second: { text: `The busy streets.`, next: 17 },
      third: { text: `The quiet parks.`, next: 18 },
    },
  },
  {
    index: 6,
    m: `Exploring? What are you hoping to find?`,
    answers: {
      first: { text: `New experiences.`, next: 19 },
      second: { text: `Interesting people.`, next: 20 },
      third: { text: `Hidden places.`, next: 21 },
    },
  },
  {
    index: 7,
    m: `Rogue, nice name! What do you enjoy doing?`,
    answers: {
      first: { text: `Exploring new places.`, next: 22 },
      second: { text: `Meeting new people.`, next: 23 },
      third: { text: `Learning new things.`, next: 24 },
    },
  },
  {
    index: 8,
    m: `Cipher, cool name! What are your interests?`,
    answers: {
      first: { text: `Technology.`, next: 25 },
      second: { text: `Art.`, next: 26 },
      third: { text: `Music.`, next: 27 },
    },
  },
  {
    index: 9,
    m: `Ghost, interesting name! What do you enjoy?`,
    answers: {
      first: { text: `Being alone.`, next: 28 },
      second: { text: `Quiet places.`, next: 29 },
      third: { text: `Reading.`, next: 30 },
    },
  },
  {
    index: 10,
    m: `You like exploring new places? Where do you go?`,
    answers: {
      first: { text: `Cities.`, next: 31 },
      second: { text: `Nature.`, next: 32 },
      third: { text: `Anywhere.`, next: 33 },
    },
  },
  {
    index: 11,
    m: `You like meeting new people? Why is that?`,
    answers: {
      first: { text: `It's fun.`, next: 34 },
      second: { text: `It's interesting.`, next: 35 },
      third: { text: `It's exciting.`, next: 36 },
    },
  },
  {
    index: 12,
    m: `You like learning new things? What do you learn?`,
    answers: {
      first: { text: `Languages.`, next: 37 },
      second: { text: `Skills.`, next: 38 },
      third: { text: `Facts.`, next: 39 },
    },
  },
  {
    index: 13,
    m: `You can fix things? What do you usually fix?`,
    answers: {
      first: { text: `Machines.`, next: 40 },
      second: { text: `Computers.`, next: 41 },
      third: { text: `Anything.`, next: 42 },
    },
  },
  {
    index: 14,
    m: `You can help people? How do you help them?`,
    answers: {
      first: { text: `Listen to them.`, next: 43 },
      second: { text: `Give advice.`, next: 44 },
      third: { text: `Be there for them.`, next: 45 },
    },
  },
  {
    index: 15,
    m: `You can keep secrets? Why is that important?`,
    answers: {
      first: { text: `It's safe.`, next: 46 },
      second: { text: `It's kind.`, next: 47 },
      third: { text: `It's smart.`, next: 48 },
    },
  },
  {
    index: 16,
    m: `You like big buildings? What do you find interesting about them?`,
    answers: {
      first: { text: `Their size.`, next: 49 },
      second: { text: `Their design.`, next: 50 },
      third: { text: `Their history.`, next: 51 },
    },
  },
  {
    index: 17,
    m: `You like busy streets? What do you enjoy about them?`,
    answers: {
      first: { text: `The energy.`, next: 52 },
      second: { text: `The people.`, next: 53 },
      third: { text: `The noise.`, next: 54 },
    },
  },
  {
    index: 18,
    m: `You like quiet parks? What do you do there?`,
    answers: {
      first: { text: `Relax.`, next: 55 },
      second: { text: `Read.`, next: 56 },
      third: { text: `Walk.`, next: 57 },
    },
  },
  {
    index: 19,
    m: `You like new experiences? What kind?`,
    answers: {
      first: { text: `Adventures.`, next: 58 },
      second: { text: `Learning.`, next: 59 },
      third: { text: `Meeting people.`, next: 60 },
    },
  },
  {
    index: 20,
    m: `You like interesting people? What makes them interesting?`,
    answers: {
      first: { text: `Their stories.`, next: 61 },
      second: { text: `Their ideas.`, next: 62 },
      third: { text: `Their kindness.`, next: 63 },
    },
  },
  {
    index: 21,
    m: `You like hidden places? What do you hope to find?`,
    answers: {
      first: { text: `Secrets.`, next: 64 },
      second: { text: `Peace.`, next: 65 },
      third: { text: `Adventure.`, next: 66 },
    },
  },
  {
    index: 22,
    m: `Exploring new places is exciting! What's your favorite?`,
    answers: {
      first: { text: `Mountains.`, next: 67 },
      second: { text: `Beaches.`, next: 68 },
      third: { text: `Forests.`, next: 69 },
    },
  },
  {
    index: 23,
    m: `Meeting new people is fun! What's the best part?`,
    answers: {
      first: { text: `Learning their stories.`, next: 70 },
      second: { text: `Making friends.`, next: 71 },
      third: { text: `Sharing experiences.`, next: 72 },
    },
  },
  {
    index: 24,
    m: `Learning new things is great! What's your latest?`,
    answers: {
      first: { text: `A new language.`, next: 73 },
      second: { text: `A new skill.`, next: 74 },
      third: { text: `A new fact.`, next: 75 },
    },
  },
  {
    index: 25,
    m: `Technology is fascinating! What's your favorite gadget?`,
    answers: {
      first: { text: `Smartphone.`, next: 76 },
      second: { text: `Laptop.`, next: 77 },
      third: { text: `Smartwatch.`, next: 78 },
    },
  },
  {
    index: 26,
    m: `Art is inspiring! What's your favorite form?`,
    answers: {
      first: { text: `Painting.`, next: 79 },
      second: { text: `Sculpture.`, next: 80 },
      third: { text: `Photography.`, next: 81 },
    },
  },
  {
    index: 27,
    m: `Music is soothing! What's your favorite genre?`,
    answers: {
      first: { text: `Rock.`, next: 82 },
      second: { text: `Classical.`, next: 83 },
      third: { text: `Jazz.`, next: 84 },
    },
  },
  {
    index: 28,
    m: `Being alone can be peaceful. What do you do alone?`,
    answers: {
      first: { text: `Read.`, next: 85 },
      second: { text: `Meditate.`, next: 86 },
      third: { text: `Write.`, next: 87 },
    },
  },
  {
    index: 29,
    m: `Quiet places are calming. What's your favorite?`,
    answers: {
      first: { text: `Library.`, next: 88 },
      second: { text: `Garden.`, next: 89 },
      third: { text: `Beach.`, next: 90 },
    },
  },
  {
    index: 30,
    m: `Reading is enriching! What's your favorite book?`,
    answers: {
      first: { text: `Fiction.`, next: 91 },
      second: { text: `Non-fiction.`, next: 92 },
      third: { text: `Mystery.`, next: 93 },
    },
  },
  {
    index: 31,
    m: `Cities are vibrant! What's your favorite city?`,
    answers: {
      first: { text: `New York.`, next: 94 },
      second: { text: `Tokyo.`, next: 95 },
      third: { text: `Paris.`, next: 96 },
    },
  },
  {
    index: 32,
    m: `Nature is beautiful! What's your favorite spot?`,
    answers: {
      first: { text: `Mountains.`, next: 97 },
      second: { text: `Lakes.`, next: 98 },
      third: { text: `Forests.`, next: 99 },
    },
  },
  {
    index: 33,
    m: `Anywhere can be an adventure! What's your next destination?`,
    answers: {
      first: { text: `A new city.`, next: 100 },
      second: { text: `A new country.`, next: 101 },
      third: { text: `A new continent.`, next: 102 },
    },
  },
  {
    index: 34,
    m: `Fun is important! What's your favorite activity?`,
    answers: {
      first: { text: `Sports.`, next: 103 },
      second: { text: `Games.`, next: 104 },
      third: { text: `Hiking.`, next: 105 },
    },
  },
  {
    index: 35,
    m: `Interesting people are inspiring! Who inspires you?`,
    answers: {
      first: { text: `Friends.`, next: 106 },
      second: { text: `Family.`, next: 107 },
      third: { text: `Leaders.`, next: 108 },
    },
  },
  {
    index: 36,
    m: `Excitement is thrilling! What's your next adventure?`,
    answers: {
      first: { text: `Skydiving.`, next: 109 },
      second: { text: `Scuba diving.`, next: 110 },
      third: { text: `Mountain climbing.`, next: 111 },
    },
  },
  {
    index: 37,
    m: `Languages are fascinating! What's your favorite language?`,
    answers: {
      first: { text: `Spanish.`, next: 112 },
      second: { text: `French.`, next: 113 },
      third: { text: `Mandarin.`, next: 114 },
    },
  },
  {
    index: 38,
    m: `Skills are valuable! What's your latest skill?`,
    answers: {
      first: { text: `Cooking.`, next: 115 },
      second: { text: `Coding.`, next: 116 },
      third: { text: `Photography.`, next: 117 },
    },
  },
  {
    index: 39,
    m: `Facts are interesting! What's a fun fact you know?`,
    answers: {
      first: { text: `Space is vast.`, next: 118 },
      second: { text: `Oceans are deep.`, next: 119 },
      third: { text: `History is rich.`, next: 120 },
    },
  },
  {
    index: 40,
    m: `Machines are complex! What's your favorite machine?`,
    answers: {
      first: { text: `Car.`, next: 121 },
      second: { text: `Plane.`, next: 122 },
      third: { text: `Train.`, next: 123 },
    },
  },
  {
    index: 41,
    m: `Computers are powerful! What's your favorite software?`,
    answers: {
      first: { text: `Operating system.`, next: 124 },
      second: { text: `Browser.`, next: 125 },
      third: { text: `Game.`, next: 126 },
    },
  },
  {
    index: 42,
    m: `Fixing anything is impressive! What's your latest project?`,
    answers: {
      first: { text: `A car.`, next: 127 },
      second: { text: `A computer.`, next: 128 },
      third: { text: `A gadget.`, next: 129 },
    },
  },
  {
    index: 43,
    m: `Listening is a great skill! Who do you listen to?`,
    answers: {
      first: { text: `Friends.`, next: 130 },
      second: { text: `Family.`, next: 131 },
      third: { text: `Podcasts.`, next: 132 },
    },
  },
  {
    index: 44,
    m: `Giving advice is helpful! What's your best advice?`,
    answers: {
      first: { text: `Be kind.`, next: 133 },
      second: { text: `Stay curious.`, next: 134 },
      third: { text: `Work hard.`, next: 135 },
    },
  },
  {
    index: 45,
    m: `Being there for others is important! How do you support them?`,
    answers: {
      first: { text: `Listen.`, next: 136 },
      second: { text: `Encourage.`, next: 137 },
      third: { text: `Help.`, next: 138 },
    },
  },
  {
    index: 46,
    m: `Safety is key! How do you stay safe?`,
    answers: {
      first: { text: `Be aware.`, next: 139 },
      second: { text: `Be prepared.`, next: 140 },
      third: { text: `Be cautious.`, next: 141 },
    },
  },
  {
    index: 47,
    m: `Kindness is powerful! How do you show kindness?`,
    answers: {
      first: { text: `Help others.`, next: 142 },
      second: { text: `Be patient.`, next: 143 },
      third: { text: `Listen.`, next: 144 },
    },
  },
  {
    index: 48,
    m: `Being smart is valuable! How do you stay smart?`,
    answers: {
      first: { text: `Read.`, next: 145 },
      second: { text: `Learn.`, next: 146 },
      third: { text: `Think.`, next: 147 },
    },
  },
  {
    index: 49,
    m: `Size is impressive! What's the biggest thing you've seen?`,
    answers: {
      first: { text: `A mountain.`, next: 148 },
      second: { text: `A building.`, next: 149 },
      third: { text: `A ship.`, next: 150 },
    },
  },
  {
    index: 50,
    m: `Design is creative! What's your favorite design?`,
    answers: {
      first: { text: `Modern.`, next: 151 },
      second: { text: `Classic.`, next: 152 },
      third: { text: `Futuristic.`, next: 153 },
    },
  },
  {
    index: 51,
    m: `History is rich! What's your favorite historical period?`,
    answers: {
      first: { text: `Ancient.`, next: 154 },
      second: { text: `Medieval.`, next: 155 },
      third: { text: `Modern.`, next: 156 },
    },
  },
  {
    index: 52,
    m: `Energy is contagious! What's your favorite energetic activity?`,
    answers: {
      first: { text: `Dancing.`, next: 157 },
      second: { text: `Running.`, next: 158 },
      third: { text: `Cycling.`, next: 159 },
    },
  },
  {
    index: 53,
    m: `People are fascinating! What's your favorite thing about people?`,
    answers: {
      first: { text: `Their stories.`, next: 160 },
      second: { text: `Their ideas.`, next: 161 },
      third: { text: `Their kindness.`, next: 162 },
    },
  },
  {
    index: 54,
    m: `Noise can be exciting! What's your favorite sound?`,
    answers: {
      first: { text: `Music.`, next: 163 },
      second: { text: `Nature.`, next: 164 },
      third: { text: `Laughter.`, next: 165 },
    },
  },
  {
    index: 55,
    m: `Relaxation is important! How do you relax?`,
    answers: {
      first: { text: `Meditation.`, next: 166 },
      second: { text: `Reading.`, next: 167 },
      third: { text: `Listening to music.`, next: 168 },
    },
  },
  {
    index: 56,
    m: `Reading is enriching! What's your favorite genre?`,
    answers: {
      first: { text: `Fiction.`, next: 169 },
      second: { text: `Non-fiction.`, next: 170 },
      third: { text: `Mystery.`, next: 171 },
    },
  },
  {
    index: 57,
    m: `Walking is healthy! Where do you like to walk?`,
    answers: {
      first: { text: `In the park.`, next: 172 },
      second: { text: `In the city.`, next: 173 },
      third: { text: `In the woods.`, next: 174 },
    },
  },
  {
    index: 58,
    m: `Adventures are thrilling! What's your next adventure?`,
    answers: {
      first: { text: `Traveling.`, next: 175 },
      second: { text: `Learning a new skill.`, next: 176 },
      third: { text: `Meeting new people.`, next: 177 },
    },
  },
  {
    index: 59,
    m: `Learning is endless! What's your next learning goal?`,
    answers: {
      first: { text: `A new language.`, next: 178 },
      second: { text: `A new hobby.`, next: 179 },
      third: { text: `A new subject.`, next: 180 },
    },
  },
  {
    index: 60,
    m: `Meeting people is enriching! Who do you want to meet next?`,
    answers: {
      first: { text: `A mentor.`, next: 181 },
      second: { text: `A friend.`, next: 182 },
      third: { text: `A leader.`, next: 183 },
    },
  },
  {
    index: 61,
    m: `Stories are captivating! What's your favorite story?`,
    answers: {
      first: { text: `A novel.`, next: 184 },
      second: { text: `A movie.`, next: 185 },
      third: { text: `A personal story.`, next: 186 },
    },
  },
  {
    index: 62,
    m: `Ideas are powerful! What's your latest idea?`,
    answers: {
      first: { text: `A project.`, next: 187 },
      second: { text: `A solution.`, next: 188 },
      third: { text: `A concept.`, next: 189 },
    },
  },
  {
    index: 63,
    m: `Kindness is contagious! How do you spread kindness?`,
    answers: {
      first: { text: `Help others.`, next: 190 },
      second: { text: `Be patient.`, next: 191 },
      third: { text: `Listen.`, next: 192 },
    },
  },
  {
    index: 64,
    m: `Secrets are intriguing! What's a secret you can share?`,
    answers: {
      first: { text: `A hidden talent.`, next: 193 },
      second: { text: `A favorite place.`, next: 194 },
      third: { text: `A personal goal.`, next: 195 },
    },
  },
  {
    index: 65,
    m: `Peace is calming! How do you find peace?`,
    answers: {
      first: { text: `Meditation.`, next: 196 },
      second: { text: `Nature.`, next: 197 },
      third: { text: `Reading.`, next: 198 },
    },
  },
  {
    index: 66,
    m: `Adventure is exciting! What's your next adventure?`,
    answers: {
      first: { text: `Traveling.`, next: 199 },
      second: { text: `Learning a new skill.`, next: 200 },
      third: { text: `Meeting new people.`, next: 201 },
    },
  },
  {
    index: 67,
    m: `Mountains are majestic! What's your favorite mountain?`,
    answers: {
      first: { text: `Everest.`, next: 202 },
      second: { text: `Kilimanjaro.`, next: 203 },
      third: { text: `Alps.`, next: 204 },
    },
  },
  {
    index: 68,
    m: `Beaches are relaxing! What's your favorite beach?`,
    answers: {
      first: { text: `Maldives.`, next: 205 },
      second: { text: `Hawaii.`, next: 206 },
      third: { text: `Bora Bora.`, next: 207 },
    },
  },
  {
    index: 69,
    m: `Forests are enchanting! What's your favorite forest?`,
    answers: {
      first: { text: `Amazon.`, next: 208 },
      second: { text: `Black Forest.`, next: 209 },
      third: { text: `Sherwood.`, next: 210 },
    },
  },
  {
    index: 70,
    m: `Learning stories is enriching! What's your favorite story?`,
    answers: {
      first: { text: `A novel.`, next: 211 },
      second: { text: `A movie.`, next: 212 },
      third: { text: `A personal story.`, next: 213 },
    },
  },
  {
    index: 71,
    m: `Making friends is rewarding! How do you make friends?`,
    answers: {
      first: { text: `Be kind.`, next: 214 },
      second: { text: `Be open.`, next: 215 },
      third: { text: `Be supportive.`, next: 216 },
    },
  },
  {
    index: 72,
    m: `Sharing experiences is fulfilling! What's your favorite experience?`,
    answers: {
      first: { text: `Traveling.`, next: 217 },
      second: { text: `Learning.`, next: 218 },
      third: { text: `Meeting people.`, next: 219 },
    },
  },
  {
    index: 73,
    m: `A new language is challenging! What's your favorite language?`,
    answers: {
      first: { text: `Spanish.`, next: 220 },
      second: { text: `French.`, next: 221 },
      third: { text: `Mandarin.`, next: 222 },
    },
  },
  {
    index: 74,
    m: `A new skill is valuable! What's your latest skill?`,
    answers: {
      first: { text: `Cooking.`, next: 223 },
      second: { text: `Coding.`, next: 224 },
      third: { text: `Photography.`, next: 225 },
    },
  },
  {
    index: 75,
    m: `A new fact is interesting! What's a fun fact you know?`,
    answers: {
      first: { text: `Space is vast.`, next: 226 },
      second: { text: `Oceans are deep.`, next: 227 },
      third: { text: `History is rich.`, next: 228 },
    },
  },
  {
    index: 76,
    m: `Smartphones are handy! What's your favorite app?`,
    answers: {
      first: { text: `Social media.`, next: 229 },
      second: { text: `Games.`, next: 230 },
      third: { text: `Productivity.`, next: 231 },
    },
  },
  {
    index: 77,
    m: `Laptops are versatile! What's your favorite use?`,
    answers: {
      first: { text: `Work.`, next: 232 },
      second: { text: `Entertainment.`, next: 233 },
      third: { text: `Learning.`, next: 234 },
    },
  },
  {
    index: 78,
    m: `Smartwatches are cool! What's your favorite feature?`,
    answers: {
      first: { text: `Fitness tracking.`, next: 235 },
      second: { text: `Notifications.`, next: 236 },
      third: { text: `Customization.`, next: 237 },
    },
  },
  {
    index: 79,
    m: `Painting is creative! What's your favorite style?`,
    answers: {
      first: { text: `Abstract.`, next: 238 },
      second: { text: `Realism.`, next: 239 },
      third: { text: `Impressionism.`, next: 240 },
    },
  },
  {
    index: 80,
    m: `Sculpture is artistic! What's your favorite material?`,
    answers: {
      first: { text: `Marble.`, next: 241 },
      second: { text: `Bronze.`, next: 242 },
      third: { text: `Wood.`, next: 243 },
    },
  },
  {
    index: 81,
    m: `Photography is expressive! What's your favorite subject?`,
    answers: {
      first: { text: `Nature.`, next: 244 },
      second: { text: `People.`, next: 245 },
      third: { text: `Architecture.`, next: 246 },
    },
  },
  {
    index: 82,
    m: `Rock music is energetic! Who's your favorite band?`,
    answers: {
      first: { text: `The Beatles.`, next: 247 },
      second: { text: `Led Zeppelin.`, next: 248 },
      third: { text: `Queen.`, next: 249 },
    },
  },
  {
    index: 83,
    m: `Classical music is timeless! Who's your favorite composer?`,
    answers: {
      first: { text: `Beethoven.`, next: 250 },
      second: { text: `Mozart.`, next: 251 },
      third: { text: `Bach.`, next: 252 },
    },
  },
  {
    index: 84,
    m: `Jazz music is smooth! Who's your favorite artist?`,
    answers: {
      first: { text: `Miles Davis.`, next: 253 },
      second: { text: `Louis Armstrong.`, next: 254 },
      third: { text: `Duke Ellington.`, next: 255 },
    },
  },
  {
    index: 85,
    m: `Reading is enriching! What's your favorite book?`,
    answers: {
      first: { text: `Fiction.`, next: 256 },
      second: { text: `Non-fiction.`, next: 257 },
      third: { text: `Mystery.`, next: 258 },
    },
  },
  {
    index: 86,
    m: `Meditation is calming! How often do you meditate?`,
    answers: {
      first: { text: `Daily.`, next: 259 },
      second: { text: `Weekly.`, next: 260 },
      third: { text: `Occasionally.`, next: 261 },
    },
  },
  {
    index: 87,
    m: `Writing is expressive! What do you write?`,
    answers: {
      first: { text: `Stories.`, next: 262 },
      second: { text: `Poems.`, next: 263 },
      third: { text: `Essays.`, next: 264 },
    },
  },
  {
    index: 88,
    m: `Libraries are peaceful! What's your favorite section?`,
    answers: {
      first: { text: `Fiction.`, next: 265 },
      second: { text: `Non-fiction.`, next: 266 },
      third: { text: `Reference.`, next: 267 },
    },
  },
  {
    index: 89,
    m: `Gardens are beautiful! What's your favorite flower?`,
    answers: {
      first: { text: `Rose.`, next: 268 },
      second: { text: `Tulip.`, next: 269 },
      third: { text: `Lily.`, next: 270 },
    },
  },
  {
    index: 90,
    m: `Beaches are relaxing! What's your favorite activity?`,
    answers: {
      first: { text: `Swimming.`, next: 271 },
      second: { text: `Sunbathing.`, next: 272 },
      third: { text: `Building sandcastles.`, next: 273 },
    },
  },
  {
    index: 91,
    m: `Fiction is imaginative! Who's your favorite author?`,
    answers: {
      first: { text: `J.K. Rowling.`, next: 274 },
      second: { text: `George R.R. Martin.`, next: 275 },
      third: { text: `J.R.R. Tolkien.`, next: 276 },
    },
  },
  {
    index: 92,
    m: `Non-fiction is informative! What's your favorite topic?`,
    answers: {
      first: { text: `History.`, next: 277 },
      second: { text: `Science.`, next: 278 },
      third: { text: `Biography.`, next: 279 },
    },
  },
  {
    index: 93,
    m: `Mystery is intriguing! What's your favorite mystery book?`,
    answers: {
      first: { text: `Sherlock Holmes.`, next: 280 },
      second: { text: `Agatha Christie.`, next: 281 },
      third: { text: `Nancy Drew.`, next: 282 },
    },
  },
  {
    index: 94,
    m: `New York is vibrant! What's your favorite spot?`,
    answers: {
      first: { text: `Central Park.`, next: 283 },
      second: { text: `Times Square.`, next: 284 },
      third: { text: `Brooklyn Bridge.`, next: 285 },
    },
  },
  {
    index: 95,
    m: `Tokyo is bustling! What's your favorite district?`,
    answers: {
      first: { text: `Shibuya.`, next: 286 },
      second: { text: `Shinjuku.`, next: 287 },
      third: { text: `Akihabara.`, next: 288 },
    },
  },
  {
    index: 96,
    m: `Paris is romantic! What's your favorite landmark?`,
    answers: {
      first: { text: `Eiffel Tower.`, next: 289 },
      second: { text: `Louvre Museum.`, next: 290 },
      third: { text: `Notre-Dame.`, next: 291 },
    },
  },
  {
    index: 97,
    m: `Mountains are majestic! What's your favorite mountain?`,
    answers: {
      first: { text: `Everest.`, next: 292 },
      second: { text: `Kilimanjaro.`, next: 293 },
      third: { text: `Alps.`, next: 294 },
    },
  },
  {
    index: 98,
    m: `Lakes are serene! What's your favorite lake?`,
    answers: {
      first: { text: `Lake Tahoe.`, next: 295 },
      second: { text: `Lake Como.`, next: 296 },
      third: { text: `Lake Victoria.`, next: 297 },
    },
  },
  {
    index: 99,
    m: `Forests are enchanting! What's your favorite forest?`,
    answers: {
      first: { text: `Amazon.`, next: 298 },
      second: { text: `Black Forest.`, next: 299 },
      third: { text: `Sherwood.`, next: 300 },
    },
  },
  {
    index: 100,
    m: `A new city is exciting! What's your next city?`,
    answers: {
      first: { text: `Barcelona.`, next: 301 },
      second: { text: `Sydney.`, next: 302 },
      third: { text: `Dubai.`, next: 303 },
    },
  },
  {
    index: 101,
    m: `A new country is adventurous! What's your next country?`,
    answers: {
      first: { text: `Japan.`, next: 304 },
      second: { text: `Brazil.`, next: 305 },
      third: { text: `South Africa.`, next: 306 },
    },
  },
  {
    index: 102,
    m: `A new continent is thrilling! What's your next continent?`,
    answers: {
      first: { text: `Asia.`, next: 307 },
      second: { text: `Africa.`, next: 308 },
      third: { text: `South America.`, next: 309 },
    },
  },
  {
    index: 103,
    m: `Sports are fun! What's your favorite sport?`,
    answers: {
      first: { text: `Soccer.`, next: 310 },
      second: { text: `Basketball.`, next: 311 },
      third: { text: `Tennis.`, next: 312 },
    },
  },
  {
    index: 104,
    m: `Games are entertaining! What's your favorite game?`,
    answers: {
      first: { text: `Chess.`, next: 313 },
      second: { text: `Monopoly.`, next: 314 },
      third: { text: `Scrabble.`, next: 315 },
    },
  },
  {
    index: 105,
    m: `Hiking is refreshing! What's your favorite trail?`,
    answers: {
      first: { text: `Appalachian Trail.`, next: 316 },
      second: { text: `Pacific Crest Trail.`, next: 317 },
      third: { text: `Inca Trail.`, next: 318 },
    },
  },
  {
    index: 106,
    m: `Friends are supportive! Who's your best friend?`,
    answers: {
      first: { text: `A childhood friend.`, next: 319 },
      second: { text: `A college friend.`, next: 320 },
      third: { text: `A work friend.`, next: 321 },
    },
  },
  {
    index: 107,
    m: `Family is important! Who's your closest family member?`,
    answers: {
      first: { text: `Parent.`, next: 322 },
      second: { text: `Sibling.`, next: 323 },
      third: { text: `Cousin.`, next: 324 },
    },
  },
  {
    index: 108,
    m: `Leaders are inspiring! Who's your favorite leader?`,
    answers: {
      first: { text: `A historical figure.`, next: 325 },
      second: { text: `A political leader.`, next: 326 },
      third: { text: `A business leader.`, next: 327 },
    },
  },
  {
    index: 109,
    m: `Skydiving is thrilling! Have you tried it?`,
    answers: {
      first: { text: `Yes.`, next: 328 },
      second: { text: `No, but I want to.`, next: 329 },
      third: { text: `No, and I don't want to.`, next: 330 },
    },
  },
  {
    index: 110,
    m: `Scuba diving is adventurous! Have you tried it?`,
    answers: {
      first: { text: `Yes.`, next: 331 },
      second: { text: `No, but I want to.`, next: 332 },
      third: { text: `No, and I don't want to.`, next: 333 },
    },
  },
  {
    index: 111,
    m: `Mountain climbing is challenging! Have you tried it?`,
    answers: {
      first: { text: `Yes.`, next: 334 },
      second: { text: `No, but I want to.`, next: 335 },
      third: { text: `No, and I don't want to.`, next: 336 },
    },
  },
  {
    index: 112,
    m: `Spanish is beautiful! Have you learned it?`,
    answers: {
      first: { text: `Yes.`, next: 337 },
      second: { text: `No, but I want to.`, next: 338 },
      third: { text: `No, and I don't want to.`, next: 339 },
    },
  },
  {
    index: 113,
    m: `French is romantic! Have you learned it?`,
    answers: {
      first: { text: `Yes.`, next: 340 },
      second: { text: `No, but I want to.`, next: 341 },
      third: { text: `No, and I don't want to.`, next: 342 },
    },
  },
  {
    index: 114,
    m: `Mandarin is complex! Have you learned it?`,
    answers: {
      first: { text: `Yes.`, next: 343 },
      second: { text: `No, but I want to.`, next: 344 },
      third: { text: `No, and I don't want to.`, next: 345 },
    },
  },
  {
    index: 115,
    m: `Cooking is creative! What's your favorite dish to cook?`,
    answers: {
      first: { text: `Pasta.`, next: 346 },
      second: { text: `Curry.`, next: 347 },
      third: { text: `Stir-fry.`, next: 348 },
    },
  },
  {
    index: 116,
    m: `Coding is logical! What's your favorite language?`,
    answers: {
      first: { text: `Python.`, next: 349 },
      second: { text: `JavaScript.`, next: 350 },
      third: { text: `Java.`, next: 351 },
    },
  },
  {
    index: 117,
    m: `Photography is artistic! What's your favorite subject?`,
    answers: {
      first: { text: `Nature.`, next: 352 },
      second: { text: `People.`, next: 353 },
      third: { text: `Architecture.`, next: 354 },
    },
  },
  {
    index: 118,
    m: `Space is vast! What's your favorite planet?`,
    answers: {
      first: { text: `Mars.`, next: 355 },
      second: { text: `Jupiter.`, next: 356 },
      third: { text: `Saturn.`, next: 357 },
    },
  },
  {
    index: 119,
    m: `Oceans are deep! What's your favorite ocean?`,
    answers: {
      first: { text: `Pacific.`, next: 358 },
      second: { text: `Atlantic.`, next: 359 },
      third: { text: `Indian.`, next: 360 },
    },
  },
  {
    index: 120,
    m: `History is rich! What's your favorite historical event?`,
    answers: {
      first: { text: `Moon landing.`, next: 361 },
      second: { text: `World War II.`, next: 362 },
      third: { text: `Renaissance.`, next: 363 },
    },
  },
  {
    index: 121,
    m: `Cars are fast! What's your favorite car brand?`,
    answers: {
      first: { text: `Tesla.`, next: 364 },
      second: { text: `BMW.`, next: 365 },
      third: { text: `Toyota.`, next: 366 },
    },
  },
  {
    index: 122,
    m: `Planes are impressive! What's your favorite airline?`,
    answers: {
      first: { text: `Emirates.`, next: 367 },
      second: { text: `Qatar Airways.`, next: 368 },
      third: { text: `Singapore Airlines.`, next: 369 },
    },
  },
  {
    index: 123,
    m: `Trains are classic! What's your favorite train journey?`,
    answers: {
      first: { text: `Trans-Siberian.`, next: 370 },
      second: { text: `Orient Express.`, next: 371 },
      third: { text: `Rocky Mountaineer.`, next: 372 },
    },
  },
  {
    index: 124,
    m: `Operating systems are essential! What's your favorite OS?`,
    answers: {
      first: { text: `Windows.`, next: 373 },
      second: { text: `macOS.`, next: 374 },
      third: { text: `Linux.`, next: 375 },
    },
  },
  {
    index: 125,
    m: `Browsers are useful! What's your favorite browser?`,
    answers: {
      first: { text: `Chrome.`, next: 376 },
      second: { text: `Firefox.`, next: 377 },
      third: { text: `Safari.`, next: 378 },
    },
  },
  {
    index: 126,
    m: `Games are fun! What's your favorite video game?`,
    answers: {
      first: { text: `Minecraft.`, next: 379 },
      second: { text: `Fortnite.`, next: 380 },
      third: { text: `The Legend of Zelda.`, next: 381 },
    },
  },
  {
    index: 127,
    m: `Cars are complex! What's your favorite car feature?`,
    answers: {
      first: { text: `Autopilot.`, next: 382 },
      second: { text: `Sunroof.`, next: 383 },
      third: { text: `Heated seats.`, next: 384 },
    },
  },
  {
    index: 128,
    m: `Computers are powerful! What's your favorite computer brand?`,
    answers: {
      first: { text: `Apple.`, next: 385 },
      second: { text: `Dell.`, next: 386 },
      third: { text: `HP.`, next: 387 },
    },
  },
  {
    index: 129,
    m: `Gadgets are cool! What's your favorite gadget?`,
    answers: {
      first: { text: `Smartphone.`, next: 388 },
      second: { text: `Tablet.`, next: 389 },
      third: { text: `Smartwatch.`, next: 390 },
    },
  },
  {
    index: 130,
    m: `Friends are supportive! Who's your best friend?`,
    answers: {
      first: { text: `A childhood friend.`, next: 391 },
      second: { text: `A college friend.`, next: 392 },
      third: { text: `A work friend.`, next: 393 },
    },
  },
  {
    index: 131,
    m: `Family is important! Who's your closest family member?`,
    answers: {
      first: { text: `Parent.`, next: 394 },
      second: { text: `Sibling.`, next: 395 },
      third: { text: `Cousin.`, next: 396 },
    },
  },
  {
    index: 132,
    m: `Podcasts are informative! What's your favorite podcast?`,
    answers: {
      first: { text: `True crime.`, next: 397 },
      second: { text: `Technology.`, next: 398 },
      third: { text: `Comedy.`, next: 399 },
    },
  },
  {
    index: 133,
    m: `Kindness is powerful! How do you show kindness?`,
    answers: {
      first: { text: `Help others.`, next: 400 },
      second: { text: `Be patient.`, next: 401 },
      third: { text: `Listen.`, next: 402 },
    },
  },
  {
    index: 134,
    m: `Curiosity is important! What are you curious about?`,
    answers: {
      first: { text: `Space.`, next: 403 },
      second: { text: `Technology.`, next: 404 },
      third: { text: `History.`, next: 405 },
    },
  },
  {
    index: 135,
    m: `Hard work pays off! What's your biggest achievement?`,
    answers: {
      first: { text: `A project.`, next: 406 },
      second: { text: `A degree.`, next: 407 },
      third: { text: `A promotion.`, next: 408 },
    },
  },
  {
    index: 136,
    m: `Listening is a great skill! Who do you listen to?`,
    answers: {
      first: { text: `Friends.`, next: 409 },
      second: { text: `Family.`, next: 410 },
      third: { text: `Podcasts.`, next: 411 },
    },
  },
  {
    index: 137,
    m: `Encouragement is uplifting! How do you encourage others?`,
    answers: {
      first: { text: `Give compliments.`, next: 412 },
      second: { text: `Offer support.`, next: 413 },
      third: { text: `Be positive.`, next: 414 },
    },
  },
  {
    index: 138,
    m: `Helping is rewarding! How do you help others?`,
    answers: {
      first: { text: `Volunteer.`, next: 415 },
      second: { text: `Donate.`, next: 416 },
      third: { text: `Listen.`, next: 417 },
    },
  },
  {
    index: 139,
    m: `Awareness is key! How do you stay aware?`,
    answers: {
      first: { text: `Read news.`, next: 418 },
      second: { text: `Observe surroundings.`, next: 419 },
      third: { text: `Ask questions.`, next: 420 },
    },
  },
  {
    index: 140,
    m: `Preparation is important! How do you prepare for challenges?`,
    answers: {
      first: { text: `Plan ahead.`, next: 421 },
      second: { text: `Stay informed.`, next: 422 },
      third: { text: `Practice.`, next: 423 },
    },
  },
  {
    index: 141,
    m: `Caution is wise! How do you stay cautious?`,
    answers: {
      first: { text: `Think ahead.`, next: 424 },
      second: { text: `Be observant.`, next: 425 },
      third: { text: `Stay informed.`, next: 426 },
    },
  },
  {
    index: 142,
    m: `Helping others is kind! How do you help?`,
    answers: {
      first: { text: `Volunteer.`, next: 427 },
      second: { text: `Donate.`, next: 428 },
      third: { text: `Listen.`, next: 429 },
    },
  },
  {
    index: 143,
    m: `Patience is a virtue! How do you practice patience?`,
    answers: {
      first: { text: `Breathe deeply.`, next: 430 },
      second: { text: `Stay calm.`, next: 431 },
      third: { text: `Be understanding.`, next: 432 },
    },
  },
  {
    index: 144,
    m: `Listening is important! Who do you listen to?`,
    answers: {
      first: { text: `Friends.`, next: 433 },
      second: { text: `Family.`, next: 434 },
      third: { text: `Podcasts.`, next: 435 },
    },
  },
  {
    index: 145,
    m: `Reading is enriching! What's your favorite book?`,
    answers: {
      first: { text: `Fiction.`, next: 436 },
      second: { text: `Non-fiction.`, next: 437 },
      third: { text: `Mystery.`, next: 438 },
    },
  },
  {
    index: 146,
    m: `Learning is endless! What's your next learning goal?`,
    answers: {
      first: { text: `A new language.`, next: 439 },
      second: { text: `A new hobby.`, next: 440 },
      third: { text: `A new subject.`, next: 441 },
    },
  },
  {
    index: 147,
    m: `Thinking is powerful! What do you think about?`,
    answers: {
      first: { text: `The future.`, next: 442 },
      second: { text: `The past.`, next: 443 },
      third: { text: `The present.`, next: 444 },
    },
  },
  {
    index: 148,
    m: `Mountains are majestic! What's your favorite mountain?`,
    answers: {
      first: { text: `Everest.`, next: 445 },
      second: { text: `Kilimanjaro.`, next: 446 },
      third: { text: `Alps.`, next: 447 },
    },
  },
  {
    index: 149,
    m: `Buildings are impressive! What's your favorite building?`,
    answers: {
      first: { text: `Skyscraper.`, next: 448 },
      second: { text: `Castle.`, next: 449 },
      third: { text: `Museum.`, next: 450 },
    },
  },
  {
    index: 150,
    m: `Ships are grand! What's your favorite ship?`,
    answers: {
      first: { text: `Titanic.`, next: 451 },
      second: { text: `Queen Mary 2.`, next: 452 },
      third: { text: `USS Enterprise.`, next: 453 },
    },
  },
  {
    index: 151,
    m: `Modern design is sleek! What's your favorite modern design?`,
    answers: {
      first: { text: `Minimalist.`, next: 454 },
      second: { text: `Industrial.`, next: 455 },
      third: { text: `Scandinavian.`, next: 456 },
    },
  },
  {
    index: 152,
    m: `Classic design is timeless! What's your favorite classic design?`,
    answers: {
      first: { text: `Victorian.`, next: 457 },
      second: { text: `Art Deco.`, next: 458 },
      third: { text: `Colonial.`, next: 459 },
    },
  },
  {
    index: 153,
    m: `Futuristic design is innovative! What's your favorite futuristic design?`,
    answers: {
      first: { text: `Space-age.`, next: 460 },
      second: { text: `Cyberpunk.`, next: 461 },
      third: { text: `Biophilic.`, next: 462 },
    },
  },
  {
    index: 154,
    m: `Ancient history is fascinating! What's your favorite ancient civilization?`,
    answers: {
      first: { text: `Egyptian.`, next: 463 },
      second: { text: `Greek.`, next: 464 },
      third: { text: `Roman.`, next: 465 },
    },
  },
  {
    index: 155,
    m: `Medieval history is intriguing! What's your favorite medieval event?`,
    answers: {
      first: { text: `Crusades.`, next: 466 },
      second: { text: `Black Death.`, next: 467 },
      third: { text: `Hundred Years' War.`, next: 468 },
    },
  },
  {
    index: 156,
    m: `Modern history is impactful! What's your favorite modern event?`,
    answers: {
      first: { text: `World War I.`, next: 469 },
      second: { text: `World War II.`, next: 470 },
      third: { text: `Cold War.`, next: 471 },
    },
  },
  {
    index: 157,
    m: `Dancing is energetic! What's your favorite dance style?`,
    answers: {
      first: { text: `Hip-hop.`, next: 472 },
      second: { text: `Ballet.`, next: 473 },
      third: { text: `Salsa.`, next: 474 },
    },
  },
  {
    index: 158,
    m: `Running is invigorating! What's your favorite running route?`,
    answers: {
      first: { text: `Park.`, next: 475 },
      second: { text: `Beach.`, next: 476 },
      third: { text: `Trail.`, next: 477 },
    },
  },
  {
    index: 159,
    m: `Cycling is refreshing! What's your favorite cycling path?`,
    answers: {
      first: { text: `City.`, next: 478 },
      second: { text: `Countryside.`, next: 479 },
      third: { text: `Mountain.`, next: 480 },
    },
  },
  {
    index: 160,
    m: `Stories are captivating! What's your favorite story?`,
    answers: {
      first: { text: `A novel.`, next: 481 },
      second: { text: `A movie.`, next: 482 },
      third: { text: `A personal story.`, next: 483 },
    },
  },
  {
    index: 161,
    m: `Ideas are powerful! What's your latest idea?`,
    answers: {
      first: { text: `A project.`, next: 484 },
      second: { text: `A solution.`, next: 485 },
      third: { text: `A concept.`, next: 486 },
    },
  },
  {
    index: 162,
    m: `Kindness is contagious! How do you spread kindness?`,
    answers: {
      first: { text: `Help others.`, next: 487 },
      second: { text: `Be patient.`, next: 488 },
      third: { text: `Listen.`, next: 489 },
    },
  },
  {
    index: 163,
    m: `Music is soothing! What's your favorite music genre?`,
    answers: {
      first: { text: `Rock.`, next: 490 },
      second: { text: `Classical.`, next: 491 },
      third: { text: `Jazz.`, next: 492 },
    },
  },
  {
    index: 164,
    m: `Nature is calming! What's your favorite nature sound?`,
    answers: {
      first: { text: `Rain.`, next: 493 },
      second: { text: `Birds.`, next: 494 },
      third: { text: `Waves.`, next: 495 },
    },
  },
  {
    index: 165,
    m: `Laughter is joyful! What's your favorite comedy?`,
    answers: {
      first: { text: `Sitcom.`, next: 496 },
      second: { text: `Stand-up.`, next: 497 },
      third: { text: `Sketch.`, next: 498 },
    },
  },
  {
    index: 166,
    m: `Meditation is calming! How often do you meditate?`,
    answers: {
      first: { text: `Daily.`, next: 499 },
      second: { text: `Weekly.`, next: 500 },
      third: { text: `Occasionally.`, next: 501 },
    },
  },
  {
    index: 167,
    m: `Reading is enriching! What's your favorite book?`,
    answers: {
      first: { text: `Fiction.`, next: 502 },
      second: { text: `Non-fiction.`, next: 503 },
      third: { text: `Mystery.`, next: 504 },
    },
  },
  {
    index: 168,
    m: `Listening to music is relaxing! What's your favorite song?`,
    answers: {
      first: { text: `A classic.`, next: 505 },
      second: { text: `A pop hit.`, next: 506 },
      third: { text: `An indie track.`, next: 507 },
    },
  },
  {
    index: 169,
    m: `Fiction is imaginative! Who's your favorite author?`,
    answers: {
      first: { text: `J.K. Rowling.`, next: 508 },
      second: { text: `George R.R. Martin.`, next: 509 },
      third: { text: `J.R.R. Tolkien.`, next: 510 },
    },
  },
  {
    index: 170,
    m: `Non-fiction is informative! What's your favorite topic?`,
    answers: {
      first: { text: `History.`, next: 511 },
      second: { text: `Science.`, next: 512 },
      third: { text: `Biography.`, next: 513 },
    },
  },
  {
    index: 171,
    m: `Mystery is intriguing! What's your favorite mystery book?`,
    answers: {
      first: { text: `Sherlock Holmes.`, next: 514 },
      second: { text: `Agatha Christie.`, next: 515 },
      third: { text: `Nancy Drew.`, next: 516 },
    },
  },
  {
    index: 172,
    m: `Walking is healthy! Where do you like to walk?`,
    answers: {
      first: { text: `In the park.`, next: 517 },
      second: { text: `In the city.`, next: 518 },
      third: { text: `In the woods.`, next: 519 },
    },
  },
  {
    index: 173,
    m: `Cities are vibrant! What's your favorite city?`,
    answers: {
      first: { text: `New York.`, next: 520 },
      second: { text: `Tokyo.`, next: 521 },
      third: { text: `Paris.`, next: 522 },
    },
  },
  {
    index: 174,
    m: `Nature is beautiful! What's your favorite spot?`,
    answers: {
      first: { text: `Mountains.`, next: 523 },
      second: { text: `Lakes.`, next: 524 },
      third: { text: `Forests.`, next: 525 },
    },
  },
  {
    index: 175,
    m: `Traveling is exciting! What's your next destination?`,
    answers: {
      first: { text: `A new city.`, next: 526 },
      second: { text: `A new country.`, next: 527 },
      third: { text: `A new continent.`, next: 528 },
    },
  },
  {
    index: 176,
    m: `Learning a new skill is rewarding! What's your next skill?`,
    answers: {
      first: { text: `Cooking.`, next: 529 },
      second: { text: `Coding.`, next: 530 },
      third: { text: `Photography.`, next: 531 },
    },
  },
  {
    index: 177,
    m: `Meeting new people is enriching! Who do you want to meet next?`,
    answers: {
      first: { text: `A mentor.`, next: 532 },
      second: { text: `A friend.`, next: 533 },
      third: { text: `A leader.`, next: 534 },
    },
  },
  {
    index: 178,
    m: `A new language is challenging! What's your favorite language?`,
    answers: {
      first: { text: `Spanish.`, next: 535 },
      second: { text: `French.`, next: 536 },
      third: { text: `Mandarin.`, next: 537 },
    },
  },
  {
    index: 179,
    m: `A new hobby is fun! What's your favorite hobby?`,
    answers: {
      first: { text: `Gardening.`, next: 538 },
      second: { text: `Painting.`, next: 539 },
      third: { text: `Writing.`, next: 540 },
    },
  },
  {
    index: 180,
    m: `A new subject is interesting! What's your favorite subject?`,
    answers: {
      first: { text: `Math.`, next: 541 },
      second: { text: `Science.`, next: 542 },
      third: { text: `History.`, next: 543 },
    },
  },
  {
    index: 181,
    m: `A mentor is inspiring! Who's your mentor?`,
    answers: {
      first: { text: `A teacher.`, next: 544 },
      second: { text: `A family member.`, next: 545 },
      third: { text: `A friend.`, next: 546 },
    },
  },
  {
    index: 182,
    m: `A friend is supportive! Who's your best friend?`,
    answers: {
      first: { text: `A childhood friend.`, next: 547 },
      second: { text: `A college friend.`, next: 548 },
      third: { text: `A work friend.`, next: 549 },
    },
  },
  {
    index: 183,
    m: `A leader is motivating! Who's your favorite leader?`,
    answers: {
      first: { text: `A historical figure.`, next: 550 },
      second: { text: `A political leader.`, next: 551 },
      third: { text: `A business leader.`, next: 552 },
    },
  },
  {
    index: 184,
    m: `RPGs are immersive! What's your favorite RPG?`,
    answers: {
      first: { text: `Final Fantasy.`, next: 553 },
      second: { text: `The Witcher.`, next: 554 },
      third: { text: `Skyrim.`, next: 555 },
    },
  },
  {
    index: 185,
    m: `Shooters are intense! What's your favorite shooter?`,
    answers: {
      first: { text: `Call of Duty.`, next: 556 },
      second: { text: `Overwatch.`, next: 557 },
      third: { text: `Fortnite.`, next: 558 },
    },
  },
  {
    index: 186,
    m: `Strategy games are challenging! What's your favorite strategy game?`,
    answers: {
      first: { text: `Civilization.`, next: 559 },
      second: { text: `StarCraft.`, next: 560 },
      third: { text: `Age of Empires.`, next: 561 },
    },
  },
  {
    index: 187,
    m: `Social media is connecting! What's your favorite platform?`,
    answers: {
      first: { text: `Facebook.`, next: 562 },
      second: { text: `Twitter.`, next: 563 },
      third: { text: `Instagram.`, next: 564 },
    },
  },
  {
    index: 188,
    m: `News is informative! What's your favorite news topic?`,
    answers: {
      first: { text: `Politics.`, next: 565 },
      second: { text: `Technology.`, next: 566 },
      third: { text: `Sports.`, next: 567 },
    },
  },
  {
    index: 189,
    m: `Forums are engaging! What's your favorite forum?`,
    answers: {
      first: { text: `Reddit.`, next: 568 },
      second: { text: `Quora.`, next: 569 },
      third: { text: `Stack Overflow.`, next: 570 },
    },
  },
  {
    index: 190,
    m: `Apple is innovative! What's your favorite Apple product?`,
    answers: {
      first: { text: `iPhone.`, next: 571 },
      second: { text: `MacBook.`, next: 572 },
      third: { text: `iPad.`, next: 573 },
    },
  },
  {
    index: 191,
    m: `Samsung is versatile! What's your favorite Samsung product?`,
    answers: {
      first: { text: `Galaxy phone.`, next: 574 },
      second: { text: `Smart TV.`, next: 575 },
      third: { text: `Tablet.`, next: 576 },
    },
  },
  {
    index: 192,
    m: `Google is innovative! What's your favorite Google product?`,
    answers: {
      first: { text: `Pixel phone.`, next: 577 },
      second: { text: `Chromebook.`, next: 578 },
      third: { text: `Nest.`, next: 579 },
    },
  },
  {
    index: 193,
    m: `Reading is enriching! What's your favorite book?`,
    answers: {
      first: { text: `Fiction.`, next: 580 },
      second: { text: `Non-fiction.`, next: 581 },
      third: { text: `Mystery.`, next: 582 },
    },
  },
  {
    index: 194,
    m: `Drawing is creative! What's your favorite drawing subject?`,
    answers: {
      first: { text: `Nature.`, next: 583 },
      second: { text: `People.`, next: 584 },
      third: { text: `Architecture.`, next: 585 },
    },
  },
  {
    index: 195,
    m: `Watching videos is entertaining! What's your favorite video genre?`,
    answers: {
      first: { text: `Comedy.`, next: 586 },
      second: { text: `Documentary.`, next: 587 },
      third: { text: `Drama.`, next: 588 },
    },
  },
  {
    index: 196,
    m: `Smartwatches are cool! What's your favorite feature?`,
    answers: {
      first: { text: `Fitness tracking.`, next: 589 },
      second: { text: `Notifications.`, next: 590 },
      third: { text: `Customization.`, next: 591 },
    },
  },
  {
    index: 197,
    m: `Fitness trackers are useful! What's your favorite activity to track?`,
    answers: {
      first: { text: `Running.`, next: 592 },
      second: { text: `Cycling.`, next: 593 },
      third: { text: `Swimming.`, next: 594 },
    },
  },
  {
    index: 198,
    m: `VR headsets are immersive! What's your favorite VR experience?`,
    answers: {
      first: { text: `Gaming.`, next: 595 },
      second: { text: `Travel.`, next: 596 },
      third: { text: `Education.`, next: 597 },
    },
  },
  {
    index: 199,
    m: `Photography is artistic! What's your favorite subject?`,
    answers: {
      first: { text: `Nature.`, next: 598 },
      second: { text: `People.`, next: 599 },
      third: { text: `Architecture.`, next: 600 },
    },
  },
  {
    index: 200,
    m: `Racing is thrilling! What's your favorite racing sport?`,
    answers: {
      first: { text: `Formula 1.`, next: 601 },
      second: { text: `NASCAR.`, next: 602 },
      third: { text: `Rally.`, next: 603 },
    },
  },
  {
    index: 201,
    m: `Exploration is adventurous! What's your favorite exploration activity?`,
    answers: {
      first: { text: `Hiking.`, next: 604 },
      second: { text: `Scuba diving.`, next: 605 },
      third: { text: `Caving.`, next: 606 },
    },
  },
  {
    index: 202,
    m: `Alexa is helpful! What's your favorite Alexa skill?`,
    answers: {
      first: { text: `Music.`, next: 607 },
      second: { text: `Smart home.`, next: 608 },
      third: { text: `Reminders.`, next: 609 },
    },
  },
  {
    index: 203,
    m: `Google Assistant is smart! What's your favorite Google Assistant feature?`,
    answers: {
      first: { text: `Voice commands.`, next: 610 },
      second: { text: `Smart home.`, next: 611 },
      third: { text: `Reminders.`, next: 612 },
    },
  },
  {
    index: 204,
    m: `Siri is convenient! What's your favorite Siri feature?`,
    answers: {
      first: { text: `Voice commands.`, next: 613 },
      second: { text: `Smart home.`, next: 614 },
      third: { text: `Reminders.`, next: 615 },
    },
  },

  {
    index: 205,
    m: `Manufacturing is essential! What's your favorite aspect of it?`,
    answers: {
      first: { text: `Automation.`, next: 616 },
      second: { text: `Quality control.`, next: 617 },
      third: { text: `Innovation.`, next: 618 },
    },
  },
  {
    index: 206,
    m: `Logistics is crucial! What's your favorite part of logistics?`,
    answers: {
      first: { text: `Supply chain.`, next: 619 },
      second: { text: `Distribution.`, next: 620 },
      third: { text: `Inventory management.`, next: 621 },
    },
  },
  {
    index: 207,
    m: `Healthcare is vital! What's your favorite healthcare technology?`,
    answers: {
      first: { text: `Telemedicine.`, next: 622 },
      second: { text: `Wearable devices.`, next: 623 },
      third: { text: `Robotic surgery.`, next: 624 },
    },
  },
  {
    index: 208,
    m: `Web apps are versatile! What do you like to build?`,
    answers: {
      first: { text: `E-commerce sites.`, next: 625 },
      second: { text: `Blogs.`, next: 626 },
      third: { text: `Portfolios.`, next: 627 },
    },
  },
  {
    index: 209,
    m: `Games are fun! What type of games do you create?`,
    answers: {
      first: { text: `Puzzle games.`, next: 628 },
      second: { text: `Adventure games.`, next: 629 },
      third: { text: `Simulation games.`, next: 630 },
    },
  },
  {
    index: 210,
    m: `Tools are useful! What kind of tools do you develop?`,
    answers: {
      first: { text: `Productivity tools.`, next: 631 },
      second: { text: `Design tools.`, next: 632 },
      third: { text: `Development tools.`, next: 633 },
    },
  },
  {
    index: 211,
    m: `Data analysis is insightful! What do you analyze?`,
    answers: {
      first: { text: `Market trends.`, next: 634 },
      second: { text: `Customer behavior.`, next: 635 },
      third: { text: `Financial data.`, next: 636 },
    },
  },
  {
    index: 212,
    m: `Web development is creative! What do you focus on?`,
    answers: {
      first: { text: `Front-end.`, next: 637 },
      second: { text: `Back-end.`, next: 638 },
      third: { text: `Full-stack.`, next: 639 },
    },
  },
  {
    index: 213,
    m: `Machine learning is powerful! What do you use it for?`,
    answers: {
      first: { text: `Predictive modeling.`, next: 640 },
      second: { text: `Image recognition.`, next: 641 },
      third: { text: `Natural language processing.`, next: 642 },
    },
  },
  {
    index: 214,
    m: `Mobile apps are handy! What do you develop?`,
    answers: {
      first: { text: `Games.`, next: 643 },
      second: { text: `Utilities.`, next: 644 },
      third: { text: `Social apps.`, next: 645 },
    },
  },
  {
    index: 215,
    m: `Enterprise software is robust! What do you focus on?`,
    answers: {
      first: { text: `CRM systems.`, next: 646 },
      second: { text: `ERP systems.`, next: 647 },
      third: { text: `HR systems.`, next: 648 },
    },
  },
  {
    index: 216,
    m: `Games are engaging! What do you develop?`,
    answers: {
      first: { text: `Mobile games.`, next: 649 },
      second: { text: `PC games.`, next: 650 },
      third: { text: `Console games.`, next: 651 },
    },
  },
  {
    index: 217,
    m: `Final Fantasy is epic! What's your favorite game in the series?`,
    answers: {
      first: { text: `Final Fantasy VII.`, next: 652 },
      second: { text: `Final Fantasy X.`, next: 653 },
      third: { text: `Final Fantasy XV.`, next: 654 },
    },
  },
  {
    index: 218,
    m: `The Witcher is immersive! Who's your favorite character?`,
    answers: {
      first: { text: `Geralt.`, next: 655 },
      second: { text: `Yennefer.`, next: 656 },
      third: { text: `Ciri.`, next: 657 },
    },
  },
  {
    index: 219,
    m: `Skyrim is vast! What's your favorite quest?`,
    answers: {
      first: { text: `The Dark Brotherhood.`, next: 658 },
      second: { text: `The Thieves Guild.`, next: 659 },
      third: { text: `The Main Quest.`, next: 660 },
    },
  },
  {
    index: 220,
    m: `Call of Duty is intense! What's your favorite mode?`,
    answers: {
      first: { text: `Multiplayer.`, next: 661 },
      second: { text: `Campaign.`, next: 662 },
      third: { text: `Zombies.`, next: 663 },
    },
  },
  {
    index: 221,
    m: `Overwatch is strategic! Who's your favorite hero?`,
    answers: {
      first: { text: `Tracer.`, next: 664 },
      second: { text: `Reinhardt.`, next: 665 },
      third: { text: `Mercy.`, next: 666 },
    },
  },
  {
    index: 222,
    m: `Fortnite is dynamic! What's your favorite weapon?`,
    answers: {
      first: { text: `Assault Rifle.`, next: 667 },
      second: { text: `Sniper Rifle.`, next: 668 },
      third: { text: `Shotgun.`, next: 669 },
    },
  },
  {
    index: 223,
    m: `Civilization is strategic! What's your favorite civilization?`,
    answers: {
      first: { text: `Rome.`, next: 670 },
      second: { text: `Egypt.`, next: 671 },
      third: { text: `China.`, next: 672 },
    },
  },
  {
    index: 224,
    m: `StarCraft is competitive! What's your favorite race?`,
    answers: {
      first: { text: `Terran.`, next: 673 },
      second: { text: `Zerg.`, next: 674 },
      third: { text: `Protoss.`, next: 675 },
    },
  },
  {
    index: 225,
    m: `Age of Empires is historical! What's your favorite era?`,
    answers: {
      first: { text: `Medieval.`, next: 676 },
      second: { text: `Renaissance.`, next: 677 },
      third: { text: `Industrial.`, next: 678 },
    },
  },
  {
    index: 226,
    m: `Facebook is social! What's your favorite feature?`,
    answers: {
      first: { text: `News Feed.`, next: 679 },
      second: { text: `Groups.`, next: 680 },
      third: { text: `Events.`, next: 681 },
    },
  },
  {
    index: 227,
    m: `Twitter is fast-paced! What's your favorite hashtag?`,
    answers: {
      first: { text: `#news.`, next: 682 },
      second: { text: `#tech.`, next: 683 },
      third: { text: `#sports.`, next: 684 },
    },
  },
  {
    index: 228,
    m: `Instagram is visual! What's your favorite type of post?`,
    answers: {
      first: { text: `Photos.`, next: 685 },
      second: { text: `Stories.`, next: 686 },
      third: { text: `Reels.`, next: 687 },
    },
  },
  {
    index: 229,
    m: `Politics is impactful! What's your favorite political topic?`,
    answers: {
      first: { text: `Elections.`, next: 688 },
      second: { text: `Policies.`, next: 689 },
      third: { text: `Debates.`, next: 690 },
    },
  },
  {
    index: 230,
    m: `Technology is evolving! What's your favorite tech trend?`,
    answers: {
      first: { text: `AI.`, next: 691 },
      second: { text: `Blockchain.`, next: 692 },
      third: { text: `IoT.`, next: 693 },
    },
  },
  {
    index: 231,
    m: `Sports are exciting! What's your favorite sport?`,
    answers: {
      first: { text: `Soccer.`, next: 694 },
      second: { text: `Basketball.`, next: 695 },
      third: { text: `Tennis.`, next: 696 },
    },
  },
  {
    index: 232,
    m: `Reddit is diverse! What's your favorite subreddit?`,
    answers: {
      first: { text: `r/technology.`, next: 697 },
      second: { text: `r/science.`, next: 698 },
      third: { text: `r/gaming.`, next: 699 },
    },
  },
  {
    index: 233,
    m: `Quora is informative! What's your favorite topic?`,
    answers: {
      first: { text: `Science.`, next: 700 },
      second: { text: `Technology.`, next: 701 },
      third: { text: `Philosophy.`, next: 702 },
    },
  },
  {
    index: 234,
    m: `Stack Overflow is helpful! What's your favorite programming language?`,
    answers: {
      first: { text: `Python.`, next: 703 },
      second: { text: `JavaScript.`, next: 704 },
      third: { text: `Java.`, next: 705 },
    },
  },
  // ... existing code ...
  {
    index: 235,
    m: `Podcasts are informative! What's your favorite podcast genre?`,
    answers: {
      first: { text: `True crime.`, next: 706 },
      second: { text: `Technology.`, next: 707 },
      third: { text: `Comedy.`, next: 708 },
    },
  },
  {
    index: 236,
    m: `Books are enlightening! What's your favorite book genre?`,
    answers: {
      first: { text: `Fiction.`, next: 709 },
      second: { text: `Non-fiction.`, next: 710 },
      third: { text: `Biography.`, next: 711 },
    },
  },
  {
    index: 237,
    m: `Movies are entertaining! What's your favorite movie genre?`,
    answers: {
      first: { text: `Action.`, next: 712 },
      second: { text: `Drama.`, next: 713 },
      third: { text: `Comedy.`, next: 714 },
    },
  },
  {
    index: 238,
    m: `TV shows are captivating! What's your favorite TV show genre?`,
    answers: {
      first: { text: `Sitcom.`, next: 715 },
      second: { text: `Drama.`, next: 716 },
      third: { text: `Documentary.`, next: 717 },
    },
  },
  {
    index: 239,
    m: `Music is universal! What's your favorite music genre?`,
    answers: {
      first: { text: `Pop.`, next: 718 },
      second: { text: `Rock.`, next: 719 },
      third: { text: `Jazz.`, next: 720 },
    },
  },
  {
    index: 240,
    m: `Art is expressive! What's your favorite art form?`,
    answers: {
      first: { text: `Painting.`, next: 721 },
      second: { text: `Sculpture.`, next: 722 },
      third: { text: `Photography.`, next: 723 },
    },
  },
  {
    index: 241,
    m: `Traveling is enriching! What's your favorite travel destination?`,
    answers: {
      first: { text: `Europe.`, next: 724 },
      second: { text: `Asia.`, next: 725 },
      third: { text: `South America.`, next: 726 },
    },
  },
  {
    index: 242,
    m: `Cooking is creative! What's your favorite cuisine?`,
    answers: {
      first: { text: `Italian.`, next: 727 },
      second: { text: `Mexican.`, next: 728 },
      third: { text: `Chinese.`, next: 729 },
    },
  },
  {
    index: 243,
    m: `Sports are exciting! What's your favorite sport to watch?`,
    answers: {
      first: { text: `Soccer.`, next: 730 },
      second: { text: `Basketball.`, next: 731 },
      third: { text: `Tennis.`, next: 732 },
    },
  },
  {
    index: 244,
    m: `Hobbies are fulfilling! What's your favorite hobby?`,
    answers: {
      first: { text: `Gardening.`, next: 733 },
      second: { text: `Reading.`, next: 734 },
      third: { text: `Painting.`, next: 735 },
    },
  },
  {
    index: 245,
    m: `Technology is evolving! What's your favorite tech gadget?`,
    answers: {
      first: { text: `Smartphone.`, next: 736 },
      second: { text: `Laptop.`, next: 737 },
      third: { text: `Tablet.`, next: 738 },
    },
  },
  {
    index: 246,
    m: `Nature is calming! What's your favorite natural landscape?`,
    answers: {
      first: { text: `Mountains.`, next: 739 },
      second: { text: `Beaches.`, next: 740 },
      third: { text: `Forests.`, next: 741 },
    },
  },
  {
    index: 247,
    m: `Fitness is important! What's your favorite exercise?`,
    answers: {
      first: { text: `Running.`, next: 742 },
      second: { text: `Yoga.`, next: 743 },
      third: { text: `Cycling.`, next: 744 },
    },
  },
  {
    index: 248,
    m: `Fashion is expressive! What's your favorite fashion style?`,
    answers: {
      first: { text: `Casual.`, next: 745 },
      second: { text: `Formal.`, next: 746 },
      third: { text: `Sporty.`, next: 747 },
    },
  },
  {
    index: 249,
    m: `Games are fun! What's your favorite type of game?`,
    answers: {
      first: { text: `Board games.`, next: 748 },
      second: { text: `Video games.`, next: 749 },
      third: { text: `Card games.`, next: 750 },
    },
  },
  {
    index: 250,
    m: `Pets are adorable! What's your favorite pet?`,
    answers: {
      first: { text: `Dog.`, next: 751 },
      second: { text: `Cat.`, next: 752 },
      third: { text: `Bird.`, next: 753 },
    },
  },
  {
    index: 251,
    m: `Seasons are beautiful! What's your favorite season?`,
    answers: {
      first: { text: `Spring.`, next: 754 },
      second: { text: `Summer.`, next: 755 },
      third: { text: `Winter.`, next: 756 },
    },
  },
  {
    index: 252,
    m: `Holidays are festive! What's your favorite holiday?`,
    answers: {
      first: { text: `Christmas.`, next: 757 },
      second: { text: `Halloween.`, next: 758 },
      third: { text: `New Year.`, next: 759 },
    },
  },
  {
    index: 253,
    m: `Colors are vibrant! What's your favorite color?`,
    answers: {
      first: { text: `Blue.`, next: 760 },
      second: { text: `Red.`, next: 761 },
      third: { text: `Green.`, next: 762 },
    },
  },
  {
    index: 254,
    m: `Animals are fascinating! What's your favorite animal?`,
    answers: {
      first: { text: `Lion.`, next: 763 },
      second: { text: `Elephant.`, next: 764 },
      third: { text: `Dolphin.`, next: 765 },
    },
  },
  {
    index: 255,
    m: `Cars are fast! What's your favorite car brand?`,
    answers: {
      first: { text: `Tesla.`, next: 766 },
      second: { text: `BMW.`, next: 767 },
      third: { text: `Toyota.`, next: 768 },
    },
  },
  {
    index: 256,
    m: `Planes are impressive! What's your favorite airline?`,
    answers: {
      first: { text: `Emirates.`, next: 769 },
      second: { text: `Qatar Airways.`, next: 770 },
      third: { text: `Singapore Airlines.`, next: 771 },
    },
  },
  {
    index: 257,
    m: `Trains are classic! What's your favorite train journey?`,
    answers: {
      first: { text: `Trans-Siberian.`, next: 772 },
      second: { text: `Orient Express.`, next: 773 },
      third: { text: `Rocky Mountaineer.`, next: 774 },
    },
  },
  {
    index: 258,
    m: `Space is vast! What's your favorite celestial body?`,
    answers: {
      first: { text: `Stars.`, next: 775 },
      second: { text: `Planets.`, next: 776 },
      third: { text: `Galaxies.`, next: 777 },
    },
  },
  {
    index: 259,
    m: `History is rich! What's your favorite historical figure?`,
    answers: {
      first: { text: `Einstein.`, next: 778 },
      second: { text: `Cleopatra.`, next: 779 },
      third: { text: `Gandhi.`, next: 780 },
    },
  },
  {
    index: 260,
    m: `Science is fascinating! What's your favorite scientific field?`,
    answers: {
      first: { text: `Physics.`, next: 781 },
      second: { text: `Biology.`, next: 782 },
      third: { text: `Chemistry.`, next: 783 },
    },
  },
  {
    index: 261,
    m: `Philosophy is deep! What's your favorite philosophical concept?`,
    answers: {
      first: { text: `Existentialism.`, next: 784 },
      second: { text: `Stoicism.`, next: 785 },
      third: { text: `Nihilism.`, next: 786 },
    },
  },
  {
    index: 262,
    m: `Languages are diverse! What's your favorite language to learn?`,
    answers: {
      first: { text: `Spanish.`, next: 787 },
      second: { text: `French.`, next: 788 },
      third: { text: `Mandarin.`, next: 789 },
    },
  },
  {
    index: 263,
    m: `Cultures are rich! What's your favorite cultural tradition?`,
    answers: {
      first: { text: `Festivals.`, next: 790 },
      second: { text: `Cuisine.`, next: 791 },
      third: { text: `Music.`, next: 792 },
    },
  },
  {
    index: 264,
    m: `Architecture is impressive! What's your favorite architectural style?`,
    answers: {
      first: { text: `Gothic.`, next: 793 },
      second: { text: `Modern.`, next: 794 },
      third: { text: `Baroque.`, next: 795 },
    },
  },
  {
    index: 265,
    m: `Gardening is relaxing! What's your favorite plant to grow?`,
    answers: {
      first: { text: `Roses.`, next: 796 },
      second: { text: `Tomatoes.`, next: 797 },
      third: { text: `Herbs.`, next: 798 },
    },
  },
  {
    index: 266,
    m: `Photography is artistic! What's your favorite photography style?`,
    answers: {
      first: { text: `Portrait.`, next: 799 },
      second: { text: `Landscape.`, next: 800 },
      third: { text: `Street.`, next: 801 },
    },
  },
  {
    index: 267,
    m: `Writing is expressive! What's your favorite writing style?`,
    answers: {
      first: { text: `Fiction.`, next: 802 },
      second: { text: `Poetry.`, next: 803 },
      third: { text: `Non-fiction.`, next: 804 },
    },
  },
  {
    index: 268,
    m: `Volunteering is rewarding! What's your favorite way to volunteer?`,
    answers: {
      first: { text: `Animal shelters.`, next: 805 },
      second: { text: `Community service.`, next: 806 },
      third: { text: `Teaching.`, next: 807 },
    },
  },
  {
    index: 269,
    m: `Meditation is calming! What's your favorite meditation technique?`,
    answers: {
      first: { text: `Mindfulness.`, next: 808 },
      second: { text: `Guided meditation.`, next: 809 },
      third: { text: `Breathing exercises.`, next: 810 },
    },
  },
  {
    index: 270,
    m: `Crafting is creative! What's your favorite craft?`,
    answers: {
      first: { text: `Knitting.`, next: 811 },
      second: { text: `Woodworking.`, next: 812 },
      third: { text: `Pottery.`, next: 813 },
    },
  },
  {
    index: 271,
    m: `Camping is adventurous! What's your favorite camping spot?`,
    answers: {
      first: { text: `National parks.`, next: 814 },
      second: { text: `Mountains.`, next: 815 },
      third: { text: `Lakeside.`, next: 816 },
    },
  },
  {
    index: 272,
    m: `Fishing is relaxing! What's your favorite fishing spot?`,
    answers: {
      first: { text: `Rivers.`, next: 817 },
      second: { text: `Lakes.`, next: 818 },
      third: { text: `Ocean.`, next: 819 },
    },
  },
  {
    index: 273,
    m: `Baking is delicious! What's your favorite thing to bake?`,
    answers: {
      first: { text: `Cakes.`, next: 820 },
      second: { text: `Cookies.`, next: 821 },
      third: { text: `Bread.`, next: 822 },
    },
  },
  {
    index: 274,
    m: `Dancing is fun! What's your favorite dance style?`,
    answers: {
      first: { text: `Hip-hop.`, next: 823 },
      second: { text: `Ballet.`, next: 824 },
      third: { text: `Salsa.`, next: 825 },
    },
  },
  {
    index: 275,
    m: `Yoga is balancing! What's your favorite yoga pose?`,
    answers: {
      first: { text: `Downward Dog.`, next: 826 },
      second: { text: `Tree Pose.`, next: 827 },
      third: { text: `Warrior Pose.`, next: 828 },
    },
  },
  {
    index: 276,
    m: `Hiking is refreshing! What's your favorite hiking trail?`,
    answers: {
      first: { text: `Appalachian Trail.`, next: 829 },
      second: { text: `Pacific Crest Trail.`, next: 830 },
      third: { text: `Inca Trail.`, next: 831 },
    },
  },
  {
    index: 277,
    m: `Cycling is invigorating! What's your favorite cycling route?`,
    answers: {
      first: { text: `City streets.`, next: 832 },
      second: { text: `Countryside.`, next: 833 },
      third: { text: `Mountain trails.`, next: 834 },
    },
  },
  {
    index: 278,
    m: `Running is energizing! What's your favorite running event?`,
    answers: {
      first: { text: `Marathon.`, next: 835 },
      second: { text: `Half-marathon.`, next: 836 },
      third: { text: `5K.`, next: 837 },
    },
  },
  {
    index: 279,
    m: `Swimming is refreshing! What's your favorite swimming style?`,
    answers: {
      first: { text: `Freestyle.`, next: 838 },
      second: { text: `Backstroke.`, next: 839 },
      third: { text: `Butterfly.`, next: 840 },
    },
  },
  {
    index: 280,
    m: `Skiing is thrilling! What's your favorite ski resort?`,
    answers: {
      first: { text: `Aspen.`, next: 841 },
      second: { text: `Whistler.`, next: 842 },
      third: { text: `Zermatt.`, next: 843 },
    },
  },
  // ... existing code ...
  {
    index: 281,
    m: `Gardening is peaceful! What's your favorite plant to grow?`,
    answers: {
      first: { text: `Roses.`, next: 844 },
      second: { text: `Tomatoes.`, next: 845 },
      third: { text: `Herbs.`, next: 846 },
    },
  },
  {
    index: 282,
    m: `Photography is creative! What's your favorite subject to photograph?`,
    answers: {
      first: { text: `Nature.`, next: 847 },
      second: { text: `People.`, next: 848 },
      third: { text: `Architecture.`, next: 849 },
    },
  },
  {
    index: 283,
    m: `Writing is expressive! What's your favorite genre to write?`,
    answers: {
      first: { text: `Fiction.`, next: 850 },
      second: { text: `Poetry.`, next: 851 },
      third: { text: `Non-fiction.`, next: 852 },
    },
  },
  {
    index: 284,
    m: `Volunteering is rewarding! Where do you like to volunteer?`,
    answers: {
      first: { text: `Animal shelters.`, next: 853 },
      second: { text: `Community centers.`, next: 854 },
      third: { text: `Schools.`, next: 855 },
    },
  },
  {
    index: 285,
    m: `Meditation is calming! What's your favorite meditation practice?`,
    answers: {
      first: { text: `Mindfulness.`, next: 856 },
      second: { text: `Guided meditation.`, next: 857 },
      third: { text: `Breathing exercises.`, next: 858 },
    },
  },
  {
    index: 286,
    m: `Crafting is fun! What's your favorite craft to make?`,
    answers: {
      first: { text: `Knitting.`, next: 859 },
      second: { text: `Woodworking.`, next: 860 },
      third: { text: `Pottery.`, next: 861 },
    },
  },
  {
    index: 287,
    m: `Camping is adventurous! What's your favorite camping spot?`,
    answers: {
      first: { text: `National parks.`, next: 862 },
      second: { text: `Mountains.`, next: 863 },
      third: { text: `Lakeside.`, next: 864 },
    },
  },
  {
    index: 288,
    m: `Fishing is relaxing! What's your favorite fishing spot?`,
    answers: {
      first: { text: `Rivers.`, next: 865 },
      second: { text: `Lakes.`, next: 866 },
      third: { text: `Ocean.`, next: 867 },
    },
  },
  {
    index: 289,
    m: `Baking is delicious! What's your favorite thing to bake?`,
    answers: {
      first: { text: `Cakes.`, next: 868 },
      second: { text: `Cookies.`, next: 869 },
      third: { text: `Bread.`, next: 870 },
    },
  },
  {
    index: 290,
    m: `Dancing is fun! What's your favorite dance style?`,
    answers: {
      first: { text: `Hip-hop.`, next: 871 },
      second: { text: `Ballet.`, next: 872 },
      third: { text: `Salsa.`, next: 873 },
    },
  },
  {
    index: 291,
    m: `Yoga is balancing! What's your favorite yoga pose?`,
    answers: {
      first: { text: `Downward Dog.`, next: 874 },
      second: { text: `Tree Pose.`, next: 875 },
      third: { text: `Warrior Pose.`, next: 876 },
    },
  },
  {
    index: 292,
    m: `Hiking is refreshing! What's your favorite hiking trail?`,
    answers: {
      first: { text: `Appalachian Trail.`, next: 877 },
      second: { text: `Pacific Crest Trail.`, next: 878 },
      third: { text: `Inca Trail.`, next: 879 },
    },
  },
  {
    index: 293,
    m: `Cycling is invigorating! What's your favorite cycling route?`,
    answers: {
      first: { text: `City streets.`, next: 880 },
      second: { text: `Countryside.`, next: 881 },
      third: { text: `Mountain trails.`, next: 882 },
    },
  },
  {
    index: 294,
    m: `Running is energizing! What's your favorite running event?`,
    answers: {
      first: { text: `Marathon.`, next: 883 },
      second: { text: `Half-marathon.`, next: 884 },
      third: { text: `5K.`, next: 885 },
    },
  },
  {
    index: 295,
    m: `Swimming is refreshing! What's your favorite swimming style?`,
    answers: {
      first: { text: `Freestyle.`, next: 886 },
      second: { text: `Backstroke.`, next: 887 },
      third: { text: `Butterfly.`, next: 888 },
    },
  },
  {
    index: 296,
    m: `Skiing is thrilling! What's your favorite ski resort?`,
    answers: {
      first: { text: `Aspen.`, next: 889 },
      second: { text: `Whistler.`, next: 890 },
      third: { text: `Zermatt.`, next: 891 },
    },
  },
  {
    index: 297,
    m: `Snowboarding is exciting! What's your favorite snowboarding spot?`,
    answers: {
      first: { text: `Park City.`, next: 892 },
      second: { text: `Breckenridge.`, next: 893 },
      third: { text: `Chamonix.`, next: 894 },
    },
  },
  {
    index: 298,
    m: `Surfing is exhilarating! What's your favorite surfing beach?`,
    answers: {
      first: { text: `Bondi Beach.`, next: 895 },
      second: { text: `Waikiki Beach.`, next: 896 },
      third: { text: `Pipeline.`, next: 897 },
    },
  },
  {
    index: 299,
    m: `Rock climbing is challenging! What's your favorite climbing spot?`,
    answers: {
      first: { text: `Yosemite.`, next: 898 },
      second: { text: `Red River Gorge.`, next: 899 },
      third: { text: `Joshua Tree.`, next: 900 },
    },
  },
  {
    index: 300,
    m: `Kayaking is adventurous! What's your favorite kayaking location?`,
    answers: {
      first: { text: `Grand Canyon.`, next: 901 },
      second: { text: `Lake Powell.`, next: 902 },
      third: { text: `Norwegian Fjords.`, next: 903 },
    },
  },
  {
    index: 301,
    m: `Canoeing is peaceful! What's your favorite canoeing river?`,
    answers: {
      first: { text: `Mississippi River.`, next: 904 },
      second: { text: `Amazon River.`, next: 905 },
      third: { text: `Thames River.`, next: 906 },
    },
  },
  {
    index: 302,
    m: `Sailing is liberating! What's your favorite sailing destination?`,
    answers: {
      first: { text: `Caribbean.`, next: 907 },
      second: { text: `Mediterranean.`, next: 908 },
      third: { text: `South Pacific.`, next: 909 },
    },
  },
  {
    index: 303,
    m: `Horseback riding is graceful! What's your favorite riding trail?`,
    answers: {
      first: { text: `Mongolian Steppe.`, next: 910 },
      second: { text: `Argentinian Pampas.`, next: 911 },
      third: { text: `American West.`, next: 912 },
    },
  },
  {
    index: 304,
    m: `Birdwatching is serene! What's your favorite bird to watch?`,
    answers: {
      first: { text: `Eagles.`, next: 913 },
      second: { text: `Owls.`, next: 914 },
      third: { text: `Hummingbirds.`, next: 915 },
    },
  },
  {
    index: 305,
    m: `Stargazing is awe-inspiring! What's your favorite constellation?`,
    answers: {
      first: { text: `Orion.`, next: 916 },
      second: { text: `Ursa Major.`, next: 917 },
      third: { text: `Cassiopeia.`, next: 918 },
    },
  },
  {
    index: 306,
    m: `Astronomy is fascinating! What's your favorite planet?`,
    answers: {
      first: { text: `Mars.`, next: 919 },
      second: { text: `Jupiter.`, next: 920 },
      third: { text: `Saturn.`, next: 921 },
    },
  },
  {
    index: 307,
    m: `Geology is intriguing! What's your favorite rock type?`,
    answers: {
      first: { text: `Igneous.`, next: 922 },
      second: { text: `Sedimentary.`, next: 923 },
      third: { text: `Metamorphic.`, next: 924 },
    },
  },
  {
    index: 308,
    m: `Botany is enlightening! What's your favorite plant species?`,
    answers: {
      first: { text: `Ferns.`, next: 925 },
      second: { text: `Cacti.`, next: 926 },
      third: { text: `Orchids.`, next: 927 },
    },
  },
  {
    index: 309,
    m: `Zoology is captivating! What's your favorite animal species?`,
    answers: {
      first: { text: `Tigers.`, next: 928 },
      second: { text: `Elephants.`, next: 929 },
      third: { text: `Dolphins.`, next: 930 },
    },
  },
  {
    index: 310,
    m: `Marine biology is fascinating! What's your favorite sea creature?`,
    answers: {
      first: { text: `Sharks.`, next: 931 },
      second: { text: `Whales.`, next: 932 },
      third: { text: `Octopuses.`, next: 933 },
    },
  },
  {
    index: 311,
    m: `Entomology is detailed! What's your favorite insect?`,
    answers: {
      first: { text: `Butterflies.`, next: 934 },
      second: { text: `Beetles.`, next: 935 },
      third: { text: `Ants.`, next: 936 },
    },
  },
  {
    index: 312,
    m: `Herpetology is unique! What's your favorite reptile?`,
    answers: {
      first: { text: `Snakes.`, next: 937 },
      second: { text: `Lizards.`, next: 938 },
      third: { text: `Turtles.`, next: 939 },
    },
  },
  {
    index: 313,
    m: `Mycology is mysterious! What's your favorite fungus?`,
    answers: {
      first: { text: `Mushrooms.`, next: 940 },
      second: { text: `Yeasts.`, next: 941 },
      third: { text: `Molds.`, next: 942 },
    },
  },
  {
    index: 314,
    m: `Meteorology is dynamic! What's your favorite weather phenomenon?`,
    answers: {
      first: { text: `Thunderstorms.`, next: 943 },
      second: { text: `Snowfall.`, next: 944 },
      third: { text: `Rainbows.`, next: 945 },
    },
  },
  {
    index: 315,
    m: `Climatology is crucial! What's your favorite climate zone?`,
    answers: {
      first: { text: `Tropical.`, next: 946 },
      second: { text: `Temperate.`, next: 947 },
      third: { text: `Polar.`, next: 948 },
    },
  },
  {
    index: 316,
    m: `Ecology is vital! What's your favorite ecosystem?`,
    answers: {
      first: { text: `Rainforest.`, next: 949 },
      second: { text: `Desert.`, next: 950 },
      third: { text: `Coral reef.`, next: 951 },
    },
  },
  {
    index: 317,
    m: `Conservation is important! What's your favorite conservation effort?`,
    answers: {
      first: { text: `Wildlife protection.`, next: 952 },
      second: { text: `Habitat restoration.`, next: 953 },
      third: { text: `Pollution reduction.`, next: 954 },
    },
  },
  {
    index: 318,
    m: `Sustainability is essential! What's your favorite sustainable practice?`,
    answers: {
      first: { text: `Recycling.`, next: 955 },
      second: { text: `Composting.`, next: 956 },
      third: { text: `Renewable energy.`, next: 957 },
    },
  },
  {
    index: 319,
    m: `Urban planning is strategic! What's your favorite city design?`,
    answers: {
      first: { text: `Grid layout.`, next: 958 },
      second: { text: `Radial layout.`, next: 959 },
      third: { text: `Organic layout.`, next: 960 },
    },
  },
  {
    index: 320,
    m: `Architecture is inspiring! What's your favorite architectural wonder?`,
    answers: {
      first: { text: `Great Wall of China.`, next: 961 },
      second: { text: `Taj Mahal.`, next: 962 },
      third: { text: `Colosseum.`, next: 963 },
    },
  },
  {
    index: 321,
    m: `Interior design is creative! What's your favorite design style?`,
    answers: {
      first: { text: `Minimalist.`, next: 964 },
      second: { text: `Bohemian.`, next: 965 },
      third: { text: `Industrial.`, next: 966 },
    },
  },
  {
    index: 322,
    m: `Fashion is expressive! What's your favorite fashion trend?`,
    answers: {
      first: { text: `Vintage.`, next: 967 },
      second: { text: `Streetwear.`, next: 968 },
      third: { text: `Athleisure.`, next: 969 },
    },
  },
  {
    index: 323,
    m: `Jewelry is elegant! What's your favorite type of jewelry?`,
    answers: {
      first: { text: `Necklaces.`, next: 970 },
      second: { text: `Rings.`, next: 971 },
      third: { text: `Bracelets.`, next: 972 },
    },
  },
  {
    index: 324,
    m: `Watches are timeless! What's your favorite watch brand?`,
    answers: {
      first: { text: `Rolex.`, next: 973 },
      second: { text: `Omega.`, next: 974 },
      third: { text: `Tag Heuer.`, next: 975 },
    },
  },
  {
    index: 325,
    m: `Perfumes are fragrant! What's your favorite scent?`,
    answers: {
      first: { text: `Floral.`, next: 976 },
      second: { text: `Woody.`, next: 977 },
      third: { text: `Citrus.`, next: 978 },
    },
  },
  {
    index: 326,
    m: `Makeup is artistic! What's your favorite makeup product?`,
    answers: {
      first: { text: `Lipstick.`, next: 979 },
      second: { text: `Mascara.`, next: 980 },
      third: { text: `Foundation.`, next: 981 },
    },
  },
  {
    index: 327,
    m: `Skincare is essential! What's your favorite skincare routine?`,
    answers: {
      first: { text: `Cleansing.`, next: 982 },
      second: { text: `Moisturizing.`, next: 983 },
      third: { text: `Exfoliating.`, next: 984 },
    },
  },
  {
    index: 328,
    m: `Haircare is important! What's your favorite hair product?`,
    answers: {
      first: { text: `Shampoo.`, next: 985 },
      second: { text: `Conditioner.`, next: 986 },
      third: { text: `Hair mask.`, next: 987 },
    },
  },
  {
    index: 329,
    m: `Nail art is creative! What's your favorite nail design?`,
    answers: {
      first: { text: `French manicure.`, next: 988 },
      second: { text: `Glitter nails.`, next: 989 },
      third: { text: `Geometric patterns.`, next: 990 },
    },
  },
  {
    index: 330,
    m: `Fitness is vital! What's your favorite workout?`,
    answers: {
      first: { text: `Cardio.`, next: 991 },
      second: { text: `Strength training.`, next: 992 },
      third: { text: `Yoga.`, next: 993 },
    },
  },
  {
    index: 331,
    m: `Nutrition is key! What's your favorite healthy food?`,
    answers: {
      first: { text: `Salads.`, next: 994 },
      second: { text: `Smoothies.`, next: 995 },
      third: { text: `Grilled chicken.`, next: 996 },
    },
  },
  {
    index: 332,
    m: `Cooking is fun! What's your favorite dish to cook?`,
    answers: {
      first: { text: `Pasta.`, next: 997 },
      second: { text: `Stir-fry.`, next: 998 },
      third: { text: `Soup.`, next: 999 },
    },
  },
  {
    index: 333,
    m: `Beverages are refreshing! What's your favorite drink?`,
    answers: {
      first: { text: `Coffee.`, next: 1000 },
      second: { text: `Tea.`, next: 1001 },
      third: { text: `Juice.`, next: 1002 },
    },
  },
  {
    index: 334,
    m: `Desserts are delightful! What's your favorite dessert?`,
    answers: {
      first: { text: `Ice cream.`, next: 1003 },
      second: { text: `Cake.`, next: 1004 },
      third: { text: `Cookies.`, next: 1005 },
    },
  },
  {
    index: 335,
    m: `Traveling is exciting! What's your favorite travel activity?`,
    answers: {
      first: { text: `Sightseeing.`, next: 1006 },
      second: { text: `Hiking.`, next: 1007 },
      third: { text: `Shopping.`, next: 1008 },
    },
  },
  {
    index: 336,
    m: `Languages are diverse! What's your favorite language to learn?`,
    answers: {
      first: { text: `Spanish.`, next: 1009 },
      second: { text: `French.`, next: 1010 },
      third: { text: `Mandarin.`, next: 1011 },
    },
  },
  {
    index: 337,
    m: `Cultures are rich! What's your favorite cultural tradition?`,
    answers: {
      first: { text: `Festivals.`, next: 1012 },
      second: { text: `Cuisine.`, next: 1013 },
      third: { text: `Music.`, next: 1014 },
    },
  },
  {
    index: 338,
    m: `Architecture is impressive! What's your favorite architectural style?`,
    answers: {
      first: { text: `Gothic.`, next: 1015 },
      second: { text: `Modern.`, next: 1016 },
      third: { text: `Baroque.`, next: 1017 },
    },
  },
  {
    index: 339,
    m: `Gardening is relaxing! What's your favorite plant to grow?`,
    answers: {
      first: { text: `Roses.`, next: 1018 },
      second: { text: `Tomatoes.`, next: 1019 },
      third: { text: `Herbs.`, next: 1020 },
    },
  },
  {
    index: 340,
    m: `Photography is artistic! What's your favorite photography style?`,
    answers: {
      first: { text: `Portrait.`, next: 1021 },
      second: { text: `Landscape.`, next: 1022 },
      third: { text: `Street.`, next: 1023 },
    },
  },
  {
    index: 341,
    m: `Writing is expressive! What's your favorite writing style?`,
    answers: {
      first: { text: `Fiction.`, next: 1024 },
      second: { text: `Poetry.`, next: 1025 },
      third: { text: `Non-fiction.`, next: 1026 },
    },
  },
  {
    index: 342,
    m: `Volunteering is rewarding! What's your favorite way to volunteer?`,
    answers: {
      first: { text: `Animal shelters.`, next: 1027 },
      second: { text: `Community service.`, next: 1028 },
      third: { text: `Teaching.`, next: 1029 },
    },
  },
  {
    index: 343,
    m: `Meditation is calming! What's your favorite meditation technique?`,
    answers: {
      first: { text: `Mindfulness.`, next: 1030 },
      second: { text: `Guided meditation.`, next: 1031 },
      third: { text: `Breathing exercises.`, next: 1032 },
    },
  },
  {
    index: 344,
    m: `Crafting is creative! What's your favorite craft?`,
    answers: {
      first: { text: `Knitting.`, next: 1033 },
      second: { text: `Woodworking.`, next: 1034 },
      third: { text: `Pottery.`, next: 1035 },
    },
  },
  {
    index: 345,
    m: `Camping is adventurous! What's your favorite camping spot?`,
    answers: {
      first: { text: `National parks.`, next: 1036 },
      second: { text: `Mountains.`, next: 1037 },
      third: { text: `Lakeside.`, next: 1038 },
    },
  },
  {
    index: 346,
    m: `Fishing is relaxing! What's your favorite fishing spot?`,
    answers: {
      first: { text: `Rivers.`, next: 1039 },
      second: { text: `Lakes.`, next: 1040 },
      third: { text: `Ocean.`, next: 1041 },
    },
  },
  {
    index: 347,
    m: `Baking is delicious! What's your favorite thing to bake?`,
    answers: {
      first: { text: `Cakes.`, next: 1042 },
      second: { text: `Cookies.`, next: 1043 },
      third: { text: `Bread.`, next: 1044 },
    },
  },
  {
    index: 348,
    m: `Dancing is fun! What's your favorite dance style?`,
    answers: {
      first: { text: `Hip-hop.`, next: 1045 },
      second: { text: `Ballet.`, next: 1046 },
      third: { text: `Salsa.`, next: 1047 },
    },
  },
  {
    index: 349,
    m: `Yoga is balancing! What's your favorite yoga pose?`,
    answers: {
      first: { text: `Downward Dog.`, next: 1048 },
      second: { text: `Tree Pose.`, next: 1049 },
      third: { text: `Warrior Pose.`, next: 1050 },
    },
  },
  {
    index: 350,
    m: `Hiking is refreshing! What's your favorite hiking trail?`,
    answers: {
      first: { text: `Appalachian Trail.`, next: 1051 },
      second: { text: `Pacific Crest Trail.`, next: 1052 },
      third: { text: `Inca Trail.`, next: 1053 },
    },
  },
  {
    index: 351,
    m: `Cycling is invigorating! What's your favorite cycling route?`,
    answers: {
      first: { text: `City streets.`, next: 1054 },
      second: { text: `Countryside.`, next: 1055 },
      third: { text: `Mountain trails.`, next: 1056 },
    },
  },
  {
    index: 352,
    m: `Running is energizing! What's your favorite running event?`,
    answers: {
      first: { text: `Marathon.`, next: 1057 },
      second: { text: `Half-marathon.`, next: 1058 },
      third: { text: `5K.`, next: 1059 },
    },
  },
  {
    index: 353,
    m: `Swimming is refreshing! What's your favorite swimming style?`,
    answers: {
      first: { text: `Freestyle.`, next: 1060 },
      second: { text: `Backstroke.`, next: 1061 },
      third: { text: `Butterfly.`, next: 1062 },
    },
  },
  {
    index: 354,
    m: `Skiing is thrilling! What's your favorite ski resort?`,
    answers: {
      first: { text: `Aspen.`, next: 1063 },
      second: { text: `Whistler.`, next: 1064 },
      third: { text: `Zermatt.`, next: 1065 },
    },
  },
  {
    index: 355,
    m: `Snowboarding is exciting! What's your favorite snowboarding spot?`,
    answers: {
      first: { text: `Park City.`, next: 1066 },
      second: { text: `Breckenridge.`, next: 1067 },
      third: { text: `Chamonix.`, next: 1068 },
    },
  },
  {
    index: 356,
    m: `Surfing is exhilarating! What's your favorite surfing beach?`,
    answers: {
      first: { text: `Bondi Beach.`, next: 1069 },
      second: { text: `Waikiki Beach.`, next: 1070 },
      third: { text: `Pipeline.`, next: 1071 },
    },
  },
  {
    index: 357,
    m: `Rock climbing is challenging! What's your favorite climbing spot?`,
    answers: {
      first: { text: `Yosemite.`, next: 1072 },
      second: { text: `Red River Gorge.`, next: 1073 },
      third: { text: `Joshua Tree.`, next: 1074 },
    },
  },
  {
    index: 358,
    m: `Kayaking is adventurous! What's your favorite kayaking location?`,
    answers: {
      first: { text: `Grand Canyon.`, next: 1075 },
      second: { text: `Lake Powell.`, next: 1076 },
      third: { text: `Norwegian Fjords.`, next: 1077 },
    },
  },
  {
    index: 359,
    m: `Canoeing is peaceful! What's your favorite canoeing river?`,
    answers: {
      first: { text: `Mississippi River.`, next: 1078 },
      second: { text: `Amazon River.`, next: 1079 },
      third: { text: `Thames River.`, next: 1080 },
    },
  },
  {
    index: 360,
    m: `Sailing is liberating! What's your favorite sailing destination?`,
    answers: {
      first: { text: `Caribbean.`, next: 1081 },
      second: { text: `Mediterranean.`, next: 1082 },
      third: { text: `South Pacific.`, next: 1083 },
    },
  },
  {
    index: 361,
    m: `Horseback riding is graceful! What's your favorite riding trail?`,
    answers: {
      first: { text: `Mongolian Steppe.`, next: 1084 },
      second: { text: `Argentinian Pampas.`, next: 1085 },
      third: { text: `American West.`, next: 1086 },
    },
  },
  {
    index: 362,
    m: `Birdwatching is serene! What's your favorite bird to watch?`,
    answers: {
      first: { text: `Eagles.`, next: 1087 },
      second: { text: `Owls.`, next: 1088 },
      third: { text: `Hummingbirds.`, next: 1089 },
    },
  },
  {
    index: 363,
    m: `Stargazing is awe-inspiring! What's your favorite constellation?`,
    answers: {
      first: { text: `Orion.`, next: 1090 },
      second: { text: `Ursa Major.`, next: 1091 },
      third: { text: `Cassiopeia.`, next: 1092 },
    },
  },
  {
    index: 364,
    m: `Astronomy is fascinating! What's your favorite planet?`,
    answers: {
      first: { text: `Mars.`, next: 1093 },
      second: { text: `Jupiter.`, next: 1094 },
      third: { text: `Saturn.`, next: 1095 },
    },
  },
  {
    index: 365,
    m: `Geology is intriguing! What's your favorite rock type?`,
    answers: {
      first: { text: `Igneous.`, next: 1096 },
      second: { text: `Sedimentary.`, next: 1097 },
      third: { text: `Metamorphic.`, next: 1098 },
    },
  },
  {
    index: 366,
    m: `Botany is enlightening! What's your favorite plant species?`,
    answers: {
      first: { text: `Ferns.`, next: 1099 },
      second: { text: `Cacti.`, next: 1100 },
      third: { text: `Orchids.`, next: 1101 },
    },
  },
  {
    index: 367,
    m: `Zoology is captivating! What's your favorite animal species?`,
    answers: {
      first: { text: `Tigers.`, next: 1102 },
      second: { text: `Elephants.`, next: 1103 },
      third: { text: `Dolphins.`, next: 1104 },
    },
  },
  {
    index: 368,
    m: `Marine biology is fascinating! What's your favorite sea creature?`,
    answers: {
      first: { text: `Sharks.`, next: 1105 },
      second: { text: `Whales.`, next: 1106 },
      third: { text: `Octopuses.`, next: 1107 },
    },
  },
  {
    index: 369,
    m: `Entomology is detailed! What's your favorite insect?`,
    answers: {
      first: { text: `Butterflies.`, next: 1108 },
      second: { text: `Beetles.`, next: 1109 },
      third: { text: `Ants.`, next: 1110 },
    },
  },
  {
    index: 370,
    m: `Herpetology is unique! What's your favorite reptile?`,
    answers: {
      first: { text: `Snakes.`, next: 1111 },
      second: { text: `Lizards.`, next: 1112 },
      third: { text: `Turtles.`, next: 1113 },
    },
  },
  {
    index: 371,
    m: `Mycology is mysterious! What's your favorite fungus?`,
    answers: {
      first: { text: `Mushrooms.`, next: 1114 },
      second: { text: `Yeasts.`, next: 1115 },
      third: { text: `Molds.`, next: 1116 },
    },
  },
  {
    index: 372,
    m: `Meteorology is dynamic! What's your favorite weather phenomenon?`,
    answers: {
      first: { text: `Thunderstorms.`, next: 1117 },
      second: { text: `Snowfall.`, next: 1118 },
      third: { text: `Rainbows.`, next: 1119 },
    },
  },
  {
    index: 373,
    m: `Climatology is crucial! What's your favorite climate zone?`,
    answers: {
      first: { text: `Tropical.`, next: 1120 },
      second: { text: `Temperate.`, next: 1121 },
      third: { text: `Polar.`, next: 1122 },
    },
  },
  {
    index: 374,
    m: `Ecology is vital! What's your favorite ecosystem?`,
    answers: {
      first: { text: `Rainforest.`, next: 1123 },
      second: { text: `Desert.`, next: 1124 },
      third: { text: `Coral reef.`, next: 1125 },
    },
  },
  {
    index: 375,
    m: `Conservation is important! What's your favorite conservation effort?`,
    answers: {
      first: { text: `Wildlife protection.`, next: 1126 },
      second: { text: `Habitat restoration.`, next: 1127 },
      third: { text: `Pollution reduction.`, next: 1128 },
    },
  },
  {
    index: 376,
    m: `Sustainability is essential! What's your favorite sustainable practice?`,
    answers: {
      first: { text: `Recycling.`, next: 1129 },
      second: { text: `Composting.`, next: 1130 },
      third: { text: `Renewable energy.`, next: 1131 },
    },
  },
  {
    index: 377,
    m: `Urban planning is strategic! What's your favorite city design?`,
    answers: {
      first: { text: `Grid layout.`, next: 1132 },
      second: { text: `Radial layout.`, next: 1133 },
      third: { text: `Organic layout.`, next: 1134 },
    },
  },
  {
    index: 378,
    m: `Architecture is inspiring! What's your favorite architectural wonder?`,
    answers: {
      first: { text: `Great Wall of China.`, next: 1135 },
      second: { text: `Taj Mahal.`, next: 1136 },
      third: { text: `Colosseum.`, next: 1137 },
    },
  },
  {
    index: 379,
    m: `Interior design is creative! What's your favorite design style?`,
    answers: {
      first: { text: `Minimalist.`, next: 1138 },
      second: { text: `Bohemian.`, next: 1139 },
      third: { text: `Industrial.`, next: 1140 },
    },
  },
  {
    index: 380,
    m: `Fashion is expressive! What's your favorite fashion trend?`,
    answers: {
      first: { text: `Vintage.`, next: 1141 },
      second: { text: `Streetwear.`, next: 1142 },
      third: { text: `Athleisure.`, next: 1143 },
    },
  },
  {
    index: 381,
    m: `Jewelry is elegant! What's your favorite type of jewelry?`,
    answers: {
      first: { text: `Necklaces.`, next: 1144 },
      second: { text: `Rings.`, next: 1145 },
      third: { text: `Bracelets.`, next: 1146 },
    },
  },
  {
    index: 382,
    m: `Watches are timeless! What's your favorite watch brand?`,
    answers: {
      first: { text: `Rolex.`, next: 1147 },
      second: { text: `Omega.`, next: 1148 },
      third: { text: `Tag Heuer.`, next: 1149 },
    },
  },
  {
    index: 383,
    m: `Perfumes are fragrant! What's your favorite scent?`,
    answers: {
      first: { text: `Floral.`, next: 1150 },
      second: { text: `Woody.`, next: 1151 },
      third: { text: `Citrus.`, next: 1152 },
    },
  },
  {
    index: 384,
    m: `Makeup is artistic! What's your favorite makeup product?`,
    answers: {
      first: { text: `Lipstick.`, next: 1153 },
      second: { text: `Mascara.`, next: 1154 },
      third: { text: `Foundation.`, next: 1155 },
    },
  },
  {
    index: 385,
    m: `Skincare is essential! What's your favorite skincare routine?`,
    answers: {
      first: { text: `Cleansing.`, next: 1156 },
      second: { text: `Moisturizing.`, next: 1157 },
      third: { text: `Exfoliating.`, next: 1158 },
    },
  },
  {
    index: 386,
    m: `Haircare is important! What's your favorite hair product?`,
    answers: {
      first: { text: `Shampoo.`, next: 1159 },
      second: { text: `Conditioner.`, next: 1160 },
      third: { text: `Hair mask.`, next: 1161 },
    },
  },
  {
    index: 387,
    m: `Nail art is creative! What's your favorite nail design?`,
    answers: {
      first: { text: `French manicure.`, next: 1162 },
      second: { text: `Glitter nails.`, next: 1163 },
      third: { text: `Geometric patterns.`, next: 1164 },
    },
  },
  {
    index: 388,
    m: `Fitness is vital! What's your favorite workout?`,
    answers: {
      first: { text: `Cardio.`, next: 1165 },
      second: { text: `Strength training.`, next: 1166 },
      third: { text: `Yoga.`, next: 1167 },
    },
  },
  {
    index: 389,
    m: `Nutrition is key! What's your favorite healthy food?`,
    answers: {
      first: { text: `Salads.`, next: 1168 },
      second: { text: `Smoothies.`, next: 1169 },
      third: { text: `Grilled chicken.`, next: 1170 },
    },
  },
  {
    index: 390,
    m: `Cooking is fun! What's your favorite dish to cook?`,
    answers: {
      first: { text: `Pasta.`, next: 1171 },
      second: { text: `Stir-fry.`, next: 1172 },
      third: { text: `Soup.`, next: 1173 },
    },
  },
  {
    index: 391,
    m: `Beverages are refreshing! What's your favorite drink?`,
    answers: {
      first: { text: `Coffee.`, next: 1174 },
      second: { text: `Tea.`, next: 1175 },
      third: { text: `Juice.`, next: 1176 },
    },
  },
  {
    index: 392,
    m: `Desserts are delightful! What's your favorite dessert?`,
    answers: {
      first: { text: `Ice cream.`, next: 1177 },
      second: { text: `Cake.`, next: 1178 },
      third: { text: `Cookies.`, next: 1179 },
    },
  },
  {
    index: 393,
    m: `Traveling is exciting! What's your favorite travel activity?`,
    answers: {
      first: { text: `Sightseeing.`, next: 1180 },
      second: { text: `Hiking.`, next: 1181 },
      third: { text: `Shopping.`, next: 1182 },
    },
  },
  {
    index: 394,
    m: `Languages are diverse! What's your favorite language to learn?`,
    answers: {
      first: { text: `Spanish.`, next: 1183 },
      second: { text: `French.`, next: 1184 },
      third: { text: `Mandarin.`, next: 1185 },
    },
  },
  {
    index: 395,
    m: `Cultures are rich! What's your favorite cultural tradition?`,
    answers: {
      first: { text: `Festivals.`, next: 1186 },
      second: { text: `Cuisine.`, next: 1187 },
      third: { text: `Music.`, next: 1188 },
    },
  },
  {
    index: 396,
    m: `Architecture is impressive! What's your favorite architectural style?`,
    answers: {
      first: { text: `Gothic.`, next: 1189 },
      second: { text: `Modern.`, next: 1190 },
      third: { text: `Baroque.`, next: 1191 },
    },
  },
  {
    index: 397,
    m: `Gardening is relaxing! What's your favorite plant to grow?`,
    answers: {
      first: { text: `Roses.`, next: 1192 },
      second: { text: `Tomatoes.`, next: 1193 },
      third: { text: `Herbs.`, next: 1194 },
    },
  },
  {
    index: 398,
    m: `Photography is artistic! What's your favorite photography style?`,
    answers: {
      first: { text: `Portrait.`, next: 1195 },
      second: { text: `Landscape.`, next: 1196 },
      third: { text: `Street.`, next: 1197 },
    },
  },
  {
    index: 399,
    m: `Writing is expressive! What's your favorite writing style?`,
    answers: {
      first: { text: `Fiction.`, next: 1198 },
      second: { text: `Poetry.`, next: 1199 },
      third: { text: `Non-fiction.`, next: 1200 },
    },
  },
  {
    index: 400,
    m: `Volunteering is rewarding! What's your favorite way to volunteer?`,
    answers: {
      first: { text: `Animal shelters.`, next: 1201 },
      second: { text: `Community service.`, next: 1202 },
      third: { text: `Teaching.`, next: 1203 },
    },
  },
  {
    index: 401,
    m: `Meditation is calming! What's your favorite meditation technique?`,
    answers: {
      first: { text: `Mindfulness.`, next: 1204 },
      second: { text: `Guided meditation.`, next: 1205 },
      third: { text: `Breathing exercises.`, next: 1206 },
    },
  },
  {
    index: 402,
    m: `Crafting is creative! What's your favorite craft?`,
    answers: {
      first: { text: `Knitting.`, next: 1207 },
      second: { text: `Woodworking.`, next: 1208 },
      third: { text: `Pottery.`, next: 1209 },
    },
  },
  {
    index: 403,
    m: `Camping is adventurous! What's your favorite camping spot?`,
    answers: {
      first: { text: `National parks.`, next: 1210 },
      second: { text: `Mountains.`, next: 1211 },
      third: { text: `Lakeside.`, next: 1212 },
    },
  },
  {
    index: 404,
    m: `Fishing is relaxing! What's your favorite fishing spot?`,
    answers: {
      first: { text: `Rivers.`, next: 1213 },
      second: { text: `Lakes.`, next: 1214 },
      third: { text: `Ocean.`, next: 1215 },
    },
  },
  {
    index: 405,
    m: `Baking is delicious! What's your favorite thing to bake?`,
    answers: {
      first: { text: `Cakes.`, next: 1216 },
      second: { text: `Cookies.`, next: 1217 },
      third: { text: `Bread.`, next: 1218 },
    },
  },
  {
    index: 406,
    m: `Dancing is fun! What's your favorite dance style?`,
    answers: {
      first: { text: `Hip-hop.`, next: 1219 },
      second: { text: `Ballet.`, next: 1220 },
      third: { text: `Salsa.`, next: 1221 },
    },
  },
  {
    index: 407,
    m: `Yoga is balancing! What's your favorite yoga pose?`,
    answers: {
      first: { text: `Downward Dog.`, next: 1222 },
      second: { text: `Tree Pose.`, next: 1223 },
      third: { text: `Warrior Pose.`, next: 1224 },
    },
  },
  {
    index: 408,
    m: `Hiking is refreshing! What's your favorite hiking trail?`,
    answers: {
      first: { text: `Appalachian Trail.`, next: 1225 },
      second: { text: `Pacific Crest Trail.`, next: 1226 },
      third: { text: `Inca Trail.`, next: 1227 },
    },
  },
  {
    index: 409,
    m: `Cycling is invigorating! What's your favorite cycling route?`,
    answers: {
      first: { text: `City streets.`, next: 1228 },
      second: { text: `Countryside.`, next: 1229 },
      third: { text: `Mountain trails.`, next: 1230 },
    },
  },
  {
    index: 410,
    m: `Running is energizing! What's your favorite running event?`,
    answers: {
      first: { text: `Marathon.`, next: 1231 },
      second: { text: `Half-marathon.`, next: 1232 },
      third: { text: `5K.`, next: 1233 },
    },
  },
  {
    index: 411,
    m: `Swimming is refreshing! What's your favorite swimming style?`,
    answers: {
      first: { text: `Freestyle.`, next: 1234 },
      second: { text: `Backstroke.`, next: 1235 },
      third: { text: `Butterfly.`, next: 1236 },
    },
  },
  {
    index: 412,
    m: `Skiing is thrilling! What's your favorite ski resort?`,
    answers: {
      first: { text: `Aspen.`, next: 1237 },
      second: { text: `Whistler.`, next: 1238 },
      third: { text: `Zermatt.`, next: 1239 },
    },
  },
  {
    index: 413,
    m: `Snowboarding is exciting! What's your favorite snowboarding spot?`,
    answers: {
      first: { text: `Park City.`, next: 1240 },
      second: { text: `Breckenridge.`, next: 1241 },
      third: { text: `Chamonix.`, next: 1242 },
    },
  },
  {
    index: 414,
    m: `Surfing is exhilarating! What's your favorite surfing beach?`,
    answers: {
      first: { text: `Bondi Beach.`, next: 1243 },
      second: { text: `Waikiki Beach.`, next: 1244 },
      third: { text: `Pipeline.`, next: 1245 },
    },
  },
  {
    index: 415,
    m: `Rock climbing is challenging! What's your favorite climbing spot?`,
    answers: {
      first: { text: `Yosemite.`, next: 1246 },
      second: { text: `Red River Gorge.`, next: 1247 },
      third: { text: `Joshua Tree.`, next: 1248 },
    },
  },
  {
    index: 416,
    m: `Kayaking is adventurous! What's your favorite kayaking location?`,
    answers: {
      first: { text: `Grand Canyon.`, next: 1249 },
      second: { text: `Lake Powell.`, next: 1250 },
      third: { text: `Norwegian Fjords.`, next: 1251 },
    },
  },
  {
    index: 417,
    m: `Canoeing is peaceful! What's your favorite canoeing river?`,
    answers: {
      first: { text: `Mississippi River.`, next: 1252 },
      second: { text: `Amazon River.`, next: 1253 },
      third: { text: `Thames River.`, next: 1254 },
    },
  },
  {
    index: 418,
    m: `Sailing is liberating! What's your favorite sailing destination?`,
    answers: {
      first: { text: `Caribbean.`, next: 1255 },
      second: { text: `Mediterranean.`, next: 1256 },
      third: { text: `South Pacific.`, next: 1257 },
    },
  },
  {
    index: 419,
    m: `Horseback riding is graceful! What's your favorite riding trail?`,
    answers: {
      first: { text: `Mongolian Steppe.`, next: 1258 },
      second: { text: `Argentinian Pampas.`, next: 1259 },
      third: { text: `American West.`, next: 1260 },
    },
  },
  {
    index: 420,
    m: `Birdwatching is serene! What's your favorite bird to watch?`,
    answers: {
      first: { text: `Eagles.`, next: 1261 },
      second: { text: `Owls.`, next: 1262 },
      third: { text: `Hummingbirds.`, next: 1263 },
    },
  },
  {
    index: 421,
    m: `Stargazing is awe-inspiring! What's your favorite constellation?`,
    answers: {
      first: { text: `Orion.`, next: 1264 },
      second: { text: `Ursa Major.`, next: 1265 },
      third: { text: `Cassiopeia.`, next: 1266 },
    },
  },
  {
    index: 422,
    m: `Astronomy is fascinating! What's your favorite planet?`,
    answers: {
      first: { text: `Mars.`, next: 1267 },
      second: { text: `Jupiter.`, next: 1268 },
      third: { text: `Saturn.`, next: 1269 },
    },
  },
  {
    index: 423,
    m: `Geology is intriguing! What's your favorite rock type?`,
    answers: {
      first: { text: `Igneous.`, next: 1270 },
      second: { text: `Sedimentary.`, next: 1271 },
      third: { text: `Metamorphic.`, next: 1272 },
    },
  },
  {
    index: 424,
    m: `Botany is enlightening! What's your favorite plant species?`,
    answers: {
      first: { text: `Ferns.`, next: 1273 },
      second: { text: `Cacti.`, next: 1274 },
      third: { text: `Orchids.`, next: 1275 },
    },
  },
  {
    index: 425,
    m: `Zoology is captivating! What's your favorite animal species?`,
    answers: {
      first: { text: `Tigers.`, next: 1276 },
      second: { text: `Elephants.`, next: 1277 },
      third: { text: `Dolphins.`, next: 1278 },
    },
  },
  {
    index: 426,
    m: `Marine biology is fascinating! What's your favorite sea creature?`,
    answers: {
      first: { text: `Sharks.`, next: 1279 },
      second: { text: `Whales.`, next: 1280 },
      third: { text: `Octopuses.`, next: 1281 },
    },
  },
  {
    index: 427,
    m: `Entomology is detailed! What's your favorite insect?`,
    answers: {
      first: { text: `Butterflies.`, next: 1282 },
      second: { text: `Beetles.`, next: 1283 },
      third: { text: `Ants.`, next: 1284 },
    },
  },
  {
    index: 428,
    m: `Herpetology is unique! What's your favorite reptile?`,
    answers: {
      first: { text: `Snakes.`, next: 1285 },
      second: { text: `Lizards.`, next: 1286 },
      third: { text: `Turtles.`, next: 1287 },
    },
  },
  {
    index: 429,
    m: `Mycology is mysterious! What's your favorite fungus?`,
    answers: {
      first: { text: `Mushrooms.`, next: 1288 },
      second: { text: `Yeasts.`, next: 1289 },
      third: { text: `Molds.`, next: 1290 },
    },
  },
  {
    index: 430,
    m: `Meteorology is dynamic! What's your favorite weather phenomenon?`,
    answers: {
      first: { text: `Thunderstorms.`, next: 1291 },
      second: { text: `Snowfall.`, next: 1292 },
      third: { text: `Rainbows.`, next: 1293 },
    },
  },
  {
    index: 431,
    m: `Climatology is crucial! What's your favorite climate zone?`,
    answers: {
      first: { text: `Tropical.`, next: 1294 },
      second: { text: `Temperate.`, next: 1295 },
      third: { text: `Polar.`, next: 1296 },
    },
  },
  {
    index: 432,
    m: `Ecology is vital! What's your favorite ecosystem?`,
    answers: {
      first: { text: `Rainforest.`, next: 1297 },
      second: { text: `Desert.`, next: 1298 },
      third: { text: `Coral reef.`, next: 1299 },
    },
  },
  {
    index: 433,
    m: `Conservation is important! What's your favorite conservation effort?`,
    answers: {
      first: { text: `Wildlife protection.`, next: 1300 },
      second: { text: `Habitat restoration.`, next: 1301 },
      third: { text: `Pollution reduction.`, next: 1302 },
    },
  },
  {
    index: 434,
    m: `Sustainability is essential! What's your favorite sustainable practice?`,
    answers: {
      first: { text: `Recycling.`, next: 1303 },
      second: { text: `Composting.`, next: 1304 },
      third: { text: `Renewable energy.`, next: 1305 },
    },
  },
  {
    index: 435,
    m: `Urban planning is strategic! What's your favorite city design?`,
    answers: {
      first: { text: `Grid layout.`, next: 1306 },
      second: { text: `Radial layout.`, next: 1307 },
      third: { text: `Organic layout.`, next: 1308 },
    },
  },
  {
    index: 436,
    m: `Architecture is inspiring! What's your favorite architectural wonder?`,
    answers: {
      first: { text: `Great Wall of China.`, next: 1309 },
      second: { text: `Taj Mahal.`, next: 1310 },
      third: { text: `Colosseum.`, next: 1311 },
    },
  },
  {
    index: 437,
    m: `Interior design is creative! What's your favorite design style?`,
    answers: {
      first: { text: `Minimalist.`, next: 1312 },
      second: { text: `Bohemian.`, next: 1313 },
      third: { text: `Industrial.`, next: 1314 },
    },
  },
  {
    index: 438,
    m: `Fashion is expressive! What's your favorite fashion trend?`,
    answers: {
      first: { text: `Vintage.`, next: 1315 },
      second: { text: `Streetwear.`, next: 1316 },
      third: { text: `Athleisure.`, next: 1317 },
    },
  },
  {
    index: 439,
    m: `Jewelry is elegant! What's your favorite type of jewelry?`,
    answers: {
      first: { text: `Necklaces.`, next: 1318 },
      second: { text: `Rings.`, next: 1319 },
      third: { text: `Bracelets.`, next: 1320 },
    },
  },
  {
    index: 440,
    m: `Watches are timeless! What's your favorite watch brand?`,
    answers: {
      first: { text: `Rolex.`, next: 1321 },
      second: { text: `Omega.`, next: 1322 },
      third: { text: `Tag Heuer.`, next: 1323 },
    },
  },
  {
    index: 441,
    m: `Perfumes are fragrant! What's your favorite scent?`,
    answers: {
      first: { text: `Floral.`, next: 1324 },
      second: { text: `Woody.`, next: 1325 },
      third: { text: `Citrus.`, next: 1326 },
    },
  },
  {
    index: 442,
    m: `Makeup is artistic! What's your favorite makeup product?`,
    answers: {
      first: { text: `Lipstick.`, next: 1327 },
      second: { text: `Mascara.`, next: 1328 },
      third: { text: `Foundation.`, next: 1329 },
    },
  },
  {
    index: 443,
    m: `Skincare is essential! What's your favorite skincare routine?`,
    answers: {
      first: { text: `Cleansing.`, next: 1330 },
      second: { text: `Moisturizing.`, next: 1331 },
      third: { text: `Exfoliating.`, next: 1332 },
    },
  },
  {
    index: 444,
    m: `Haircare is important! What's your favorite hair product?`,
    answers: {
      first: { text: `Shampoo.`, next: 1333 },
      second: { text: `Conditioner.`, next: 1334 },
      third: { text: `Hair mask.`, next: 1335 },
    },
  },
  {
    index: 445,
    m: `Nail art is creative! What's your favorite nail design?`,
    answers: {
      first: { text: `French manicure.`, next: 1336 },
      second: { text: `Glitter nails.`, next: 1337 },
      third: { text: `Geometric patterns.`, next: 1338 },
    },
  },
  {
    index: 446,
    m: `Fitness is vital! What's your favorite workout?`,
    answers: {
      first: { text: `Cardio.`, next: 1339 },
      second: { text: `Strength training.`, next: 1340 },
      third: { text: `Yoga.`, next: 1341 },
    },
  },
  {
    index: 447,
    m: `Nutrition is key! What's your favorite healthy food?`,
    answers: {
      first: { text: `Salads.`, next: 1342 },
      second: { text: `Smoothies.`, next: 1343 },
      third: { text: `Grilled chicken.`, next: 1344 },
    },
  },
  {
    index: 448,
    m: `Cooking is fun! What's your favorite dish to cook?`,
    answers: {
      first: { text: `Pasta.`, next: 1345 },
      second: { text: `Stir-fry.`, next: 1346 },
      third: { text: `Soup.`, next: 1347 },
    },
  },
  {
    index: 449,
    m: `Beverages are refreshing! What's your favorite drink?`,
    answers: {
      first: { text: `Coffee.`, next: 1348 },
      second: { text: `Tea.`, next: 1349 },
      third: { text: `Juice.`, next: 1350 },
    },
  },
  {
    index: 450,
    m: `Desserts are delightful! What's your favorite dessert?`,
    answers: {
      first: { text: `Ice cream.`, next: 1351 },
      second: { text: `Cake.`, next: 1352 },
      third: { text: `Cookies.`, next: 1353 },
    },
  },
  {
    index: 451,
    m: `Traveling is exciting! What's your favorite travel activity?`,
    answers: {
      first: { text: `Sightseeing.`, next: 1354 },
      second: { text: `Hiking.`, next: 1355 },
      third: { text: `Shopping.`, next: 1356 },
    },
  },
  {
    index: 452,
    m: `Languages are diverse! What's your favorite language to learn?`,
    answers: {
      first: { text: `Spanish.`, next: 1357 },
      second: { text: `French.`, next: 1358 },
      third: { text: `Mandarin.`, next: 1359 },
    },
  },
  {
    index: 453,
    m: `Cultures are rich! What's your favorite cultural tradition?`,
    answers: {
      first: { text: `Festivals.`, next: 1360 },
      second: { text: `Cuisine.`, next: 1361 },
      third: { text: `Music.`, next: 1362 },
    },
  },
  {
    index: 454,
    m: `Architecture is impressive! What's your favorite architectural style?`,
    answers: {
      first: { text: `Gothic.`, next: 1363 },
      second: { text: `Modern.`, next: 1364 },
      third: { text: `Baroque.`, next: 1365 },
    },
  },
  {
    index: 455,
    m: `Gardening is relaxing! What's your favorite plant to grow?`,
    answers: {
      first: { text: `Roses.`, next: 1366 },
      second: { text: `Tomatoes.`, next: 1367 },
      third: { text: `Herbs.`, next: 1368 },
    },
  },
  {
    index: 456,
    m: `Photography is artistic! What's your favorite photography style?`,
    answers: {
      first: { text: `Portrait.`, next: 1369 },
      second: { text: `Landscape.`, next: 1370 },
      third: { text: `Street.`, next: 1371 },
    },
  },
  {
    index: 457,
    m: `Writing is expressive! What's your favorite writing style?`,
    answers: {
      first: { text: `Fiction.`, next: 1372 },
      second: { text: `Poetry.`, next: 1373 },
      third: { text: `Non-fiction.`, next: 1374 },
    },
  },
  {
    index: 458,
    m: `Volunteering is rewarding! What's your favorite way to volunteer?`,
    answers: {
      first: { text: `Animal shelters.`, next: 1375 },
      second: { text: `Community service.`, next: 1376 },
      third: { text: `Teaching.`, next: 1377 },
    },
  },
  {
    index: 459,
    m: `Meditation is calming! What's your favorite meditation technique?`,
    answers: {
      first: { text: `Mindfulness.`, next: 1378 },
      second: { text: `Guided meditation.`, next: 1379 },
      third: { text: `Breathing exercises.`, next: 1380 },
    },
  },
  {
    index: 460,
    m: `Crafting is creative! What's your favorite craft?`,
    answers: {
      first: { text: `Knitting.`, next: 1381 },
      second: { text: `Woodworking.`, next: 1382 },
      third: { text: `Pottery.`, next: 1383 },
    },
  },
  {
    index: 461,
    m: `Camping is adventurous! What's your favorite camping spot?`,
    answers: {
      first: { text: `National parks.`, next: 1384 },
      second: { text: `Mountains.`, next: 1385 },
      third: { text: `Lakeside.`, next: 1386 },
    },
  },
  {
    index: 462,
    m: `Fishing is relaxing! What's your favorite fishing spot?`,
    answers: {
      first: { text: `Rivers.`, next: 1387 },
      second: { text: `Lakes.`, next: 1388 },
      third: { text: `Ocean.`, next: 1389 },
    },
  },
  {
    index: 463,
    m: `Baking is delicious! What's your favorite thing to bake?`,
    answers: {
      first: { text: `Cakes.`, next: 1390 },
      second: { text: `Cookies.`, next: 1391 },
      third: { text: `Bread.`, next: 1392 },
    },
  },
  {
    index: 464,
    m: `Dancing is fun! What's your favorite dance style?`,
    answers: {
      first: { text: `Hip-hop.`, next: 1393 },
      second: { text: `Ballet.`, next: 1394 },
      third: { text: `Salsa.`, next: 1395 },
    },
  },
  {
    index: 465,
    m: `Yoga is balancing! What's your favorite yoga pose?`,
    answers: {
      first: { text: `Downward Dog.`, next: 1396 },
      second: { text: `Tree Pose.`, next: 1397 },
      third: { text: `Warrior Pose.`, next: 1398 },
    },
  },
  {
    index: 466,
    m: `Hiking is refreshing! What's your favorite hiking trail?`,
    answers: {
      first: { text: `Appalachian Trail.`, next: 1399 },
      second: { text: `Pacific Crest Trail.`, next: 1400 },
      third: { text: `Inca Trail.`, next: 1401 },
    },
  },
  {
    index: 467,
    m: `Cycling is invigorating! What's your favorite cycling route?`,
    answers: {
      first: { text: `City streets.`, next: 1402 },
      second: { text: `Countryside.`, next: 1403 },
      third: { text: `Mountain trails.`, next: 1404 },
    },
  },
  {
    index: 468,
    m: `Running is energizing! What's your favorite running event?`,
    answers: {
      first: { text: `Marathon.`, next: 1405 },
      second: { text: `Half-marathon.`, next: 1406 },
      third: { text: `5K.`, next: 1407 },
    },
  },
  {
    index: 469,
    m: `Swimming is refreshing! What's your favorite swimming style?`,
    answers: {
      first: { text: `Freestyle.`, next: 1408 },
      second: { text: `Backstroke.`, next: 1409 },
      third: { text: `Butterfly.`, next: 1410 },
    },
  },
  {
    index: 470,
    m: `Skiing is thrilling! What's your favorite ski resort?`,
    answers: {
      first: { text: `Aspen.`, next: 1411 },
      second: { text: `Whistler.`, next: 1412 },
      third: { text: `Zermatt.`, next: 1413 },
    },
  },
  {
    index: 471,
    m: `Snowboarding is exciting! What's your favorite snowboarding spot?`,
    answers: {
      first: { text: `Park City.`, next: 1414 },
      second: { text: `Breckenridge.`, next: 1415 },
      third: { text: `Chamonix.`, next: 1416 },
    },
  },
  {
    index: 472,
    m: `Surfing is exhilarating! What's your favorite surfing beach?`,
    answers: {
      first: { text: `Bondi Beach.`, next: 1417 },
      second: { text: `Waikiki Beach.`, next: 1418 },
      third: { text: `Pipeline.`, next: 1419 },
    },
  },
  {
    index: 473,
    m: `Rock climbing is challenging! What's your favorite climbing spot?`,
    answers: {
      first: { text: `Yosemite.`, next: 1420 },
      second: { text: `Red River Gorge.`, next: 1421 },
      third: { text: `Joshua Tree.`, next: 1422 },
    },
  },
  {
    index: 474,
    m: `Kayaking is adventurous! What's your favorite kayaking location?`,
    answers: {
      first: { text: `Grand Canyon.`, next: 1423 },
      second: { text: `Lake Powell.`, next: 1424 },
      third: { text: `Norwegian Fjords.`, next: 1425 },
    },
  },
  {
    index: 475,
    m: `Canoeing is peaceful! What's your favorite canoeing river?`,
    answers: {
      first: { text: `Mississippi River.`, next: 1426 },
      second: { text: `Amazon River.`, next: 1427 },
      third: { text: `Thames River.`, next: 1428 },
    },
  },
  {
    index: 476,
    m: `Sailing is liberating! What's your favorite sailing destination?`,
    answers: {
      first: { text: `Caribbean.`, next: 1429 },
      second: { text: `Mediterranean.`, next: 1430 },
      third: { text: `South Pacific.`, next: 1431 },
    },
  },
];

// Function Definitions

const displayText = function (i) {
  incomingContainer.textContent = dialogue[i].m;

  option1.textContent = dialogue[i].answers.first.text;
  option2.textContent = dialogue[i].answers.second.text;
  option3.textContent = dialogue[i].answers.third.text;

  if (gameMode === 'single-letter') {
    randomizeLetters(letterGroup);

    letterBox1.textContent = letters[letterGroup][0];
    letterBox2.textContent = letters[letterGroup][1];
    letterBox3.textContent = letters[letterGroup][2];
  }
};

const randomizeLetters = function (letterGroup) {
  for (let i = 0; i < letters[letterGroup].length; i++) {
    let j = Math.floor(Math.random() * letters[letterGroup].length);
    [letters[letterGroup][i], letters[letterGroup][j]] = [
      letters[letterGroup][j],
      letters[letterGroup][i],
    ];
  }
};

const listenKeys = function () {
  // Single-letter mode

  if (gameMode === 'single-letter') {
    console.log(
      `${letterBox1.textContent}, ${letterBox2.textContent}, ${letterBox3.textContent}`
    );
    window.addEventListener('keyup', e => {
      console.log(e.key);

      if (e.key === letterBox1.textContent.toLowerCase()) {
        currentStep = dialogue[currentStep].answers.first.next;
        console.log(`currentStep value is ${currentStep}`);
        displayText(currentStep);
        return;
      }

      if (e.key === letterBox2.textContent.toLowerCase()) {
        currentStep = dialogue[currentStep].answers.second.next;
        console.log(`currentStep value is ${currentStep}`);
        displayText(currentStep);
        return;
      }

      if (e.key === letterBox3.textContent.toLowerCase()) {
        currentStep = dialogue[currentStep].answers.third.next;
        console.log(`currentStep value is ${currentStep}`);
        displayText(currentStep);
        return;
      }
    });
  }

  // Free-typing mode
};

const initializeGame = function () {
  if (gameMode === 'single-letter') {
    document
      .querySelectorAll('.letter-box')
      .forEach(el => el.classList.remove('hidden'));
  }
};

// Event Listeners

// Initialization

displayText(0);
listenKeys();

//////////////////////////////////////////////////////////////////////////////////////////
// Tests

/*

console.log('Original:', letters[0]);
randomizeLetters(0);
console.log('After randomization:');
console.log(letters[0]);
randomizeLetters(0);
console.log(letters[0]);
randomizeLetters(0);
console.log(letters[0]);
randomizeLetters(0);
console.log(letters[0]);

console.log(
  `Actual display width of upper container: ${
    document.querySelector('.upper-container').offsetWidth
  }`
);

console.log(
  `Actual display width of upper option container: ${
    document.querySelector('.option2').offsetWidth
  }`
);

console.log(
  `Actual display width of middle container: ${
    document.querySelector('.middle-container').offsetWidth
  }`
);

console.log(
  `Actual display width of middle option containers: ${
    document.querySelector('.option1').offsetWidth
  } and ${document.querySelector('.option3').offsetWidth}`
);

console.log(
  `Actual display width of lower container: ${
    document.querySelector('.lower-container').offsetWidth
  }`
);

console.log(
  `Actual display width of incoming comm container: ${
    document.querySelector('.option1').offsetWidth
  }`
);

*/
