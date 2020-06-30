const RIDDLES_1 = {
  'Riddle-1': {
    riddle: 'Mr. and Mrs. Doe have six daughters and each daughter has one brother. How many people are in the Doe family?',
    translate: 'У мистера и миссис Доу есть шесть дочерей, и у каждой дочери есть один брат. Сколько человек в семье Доу?',
    answer: 'nine',
    options: ['fourteen', 'nine', 'twelve', 'eight'],
    explain: 'There are nine Mustards in the family. Since each daughter shares the same brother, there are six girls, one boy and Mr. and Mrs. Mustard.',
    id: 1,
  },
  'Riddle-2': {
    riddle: 'Who is that with a neck and no head, two arms and no hands?  What is it?',
    translate: 'C шеей и без головы, с двумя плечами и без рук? Что это?',
    answer: 'shirt',
    options: ['scarecrow', 'stick', 'tree', 'shirt'],
    explain: 'shirt',
    id: 2,
  },
  'Riddle-3': {
    riddle: 'If eleven plus two equals one, what does nine plus five equal?',
    translate: 'Если одиннадцать плюс два равно единица, то чему равняется девять плюс пять?',
    answer: 'two',
    options: ['three', 'fourteen', 'two', 'four'],
    explain: '11 o\'clock plus 2 hours = 1 o\'clock. 9 o\'clock plus 5 hours = 2 o\'clock',
    id: 3,
  },
  'Riddle-4': {
    riddle: 'What common English verb becomes its own past tense by rearranging its letters?',
    translate: 'Какой неправильный английский глагол становится собственным прошедшим временем при перестановке букв?',
    answer: 'eat',
    options: ['read', 'hold', 'beat', 'eat'],
    explain: 'eat -> ate',
    id: 4,
  },
  'Riddle-5': {
    riddle: 'The more you take, the more you leave behind. What am I?',
    translate: 'Чем больше вы сделаете, тем больше останется позади вас. Что это?',
    answer: 'footsteps',
    options: ['footsteps', 'experience', 'time', 'work'],
    explain: 'footsteps',
    id: 5,
  },
  'Riddle-6': {
    riddle: 'David\'s father has three sons: Snap, Crackle, and _____?',
    translate: 'У отца Дэвида трое сыновей: Снайп, Крэкл и _____?',
    answer: 'David',
    options: ['Carl', 'David', 'Snap', 'Crackle'],
    explain: 'David',
    id: 6,
  },
  'Riddle-7': {
    riddle: 'What belongs to you, but other people use it more than you?',
    translate: 'Что принадлежит вам, но окружающие люди используют это чаще вас?',
    answer: 'name',
    options: ['name', 'kindness', 'pen', 'car'],
    explain: 'name',
    id: 7,
  },
  'Riddle-8': {
    riddle: 'I am not alive, but I grow; I don\'t have lungs, but I need air; I don\'t have a mouth, but water kills me. What am I?',
    translate: 'Я не живой, но я расту; У меня нет легких, но мне нужен воздух; У меня нет рта, но вода убивает меня. Что это?',
    answer: 'fire',
    options: ['ghost', 'lightning', 'dark', 'fire'],
    explain: 'fire',
    id: 8,
  },
  'Riddle-9': {
    riddle: 'What can you break, even if you never pick it up or touch it?',
    translate: 'Что вы можете разрушить, без прикосновений к чему-либо или взаимодействий с кем-либо?',
    answer: 'promise',
    options: ['air', 'smile', 'promise', 'building'],
    explain: 'promise',
    id: 9,
  },
  'Riddle-10': {
    riddle: 'I make two people out of one. What am I?',
    translate: 'Я делаю двух человек из одного. Что я?',
    answer: 'mirror',
    options: ['mirror', 'physics', 'science', 'magic'],
    explain: 'mirror',
    id: 10,
  },
  'Riddle-11': {
    riddle: 'They have not flesh, nor feathers, nor scales, nor bone. Yet they have fingers and thumbs of their own. What are they?',
    translate: 'У них нет ни плоти, ни перьев, ни чешуи, ни костей. И все же у них есть свои пальцы. Что это?',
    answer: 'gloves',
    options: ['frogs', 'shoes', 'cold', 'gloves'],
    explain: 'gloves',
    id: 11,
  },
  'Riddle-12': {
    riddle: `Always in you, Sometimes on you;
    If I surround you, I can kill you.
    What am I?`,
    translate: 'Всегда в тебе, иногда на тебе. Eсли погрузишься в неё с головой, то можешь этого не пережить. Что это?',
    answer: 'water',
    options: ['bacteria', 'ground', 'love', 'water'],
    explain: 'water',
    id: 12,
  },
  'Riddle-13': {
    riddle: 'I have no feet, no hands, no wings, but I climb to the sky. What am I?',
    translate: 'У меня нет ни ног, ни рук, ни крыльев, но я поднимаюсь в небо. Что это?',
    answer: 'smoke',
    options: ['bird', 'smoke', 'rain', 'fog'],
    explain: 'smoke',
    id: 13,
  },
  'Riddle-14': {
    riddle: 'What goes up but never comes down?',
    translate: 'Что всегда увеличивается, но никогда не уменьшится?',
    answer: 'age',
    options: ['salary', 'experience', 'speed of light', 'age'],
    explain: 'age',
    id: 14,
  },
  'Riddle-15': {
    riddle: 'If you have me, you want to share me. If you share me, you haven\'t got me. What am I?',
    translate: 'Если у вас есть это, вы хотите поделиться этим. Если вы поделитесь этим, вы навсегда это потеряете. Что это?',
    answer: 'secret',
    options: ['secret', 'cigarettes', 'money', 'advice'],
    explain: 'secret',
    id: 15,
  },
};

const RIDDLES_2 = {
  'Riddle-16': {
    riddle: 'I shave every day, but my beard stays the same. What am I?',
    translate: 'Если у вас есть это, вы хотите поделиться этим. Если вы поделитесь этим, вы навсегда это потеряете. Что это?',
    answer: 'barber',
    options: ['pirate', 'soldier', 'grandfather', 'barber'],
    explain: 'barber',
    id: 16,
  },
  'Riddle-17': {
    riddle: 'I am a riddle of six; my first three letters refer to an automobile; my last three letters refer to a household animal; my first four letters is a fish; my whole is found in your room. What am I?',
    translate: 'Я загадка шести букв; мои первые три буквы относятся к автомобилю; мои последние три письма относятся к домашнему животному; мои первые четыре буквы - рыба; целое слово - предмет, которых находится в твоей комнате. Что это?',
    answer: 'carpet',
    options: ['chevrolet', 'carpet', 'sofa', 'dodge'],
    explain: 'carpet',
    id: 17,
  },
  'Riddle-18': {
    riddle: 'I\'m as small as an ant, as big as a whale. I\'ll approach like a breeze, but can come like a gale. By some I get hit, but all have shown fear. I\'ll dance to the music, though I can\'t hear. Of names I have many, of names I have one. I\'m as slow as a snail, but from me you can\'t run. What am I?',
    translate: 'Бываю такой же маленькой, как муравей, бываю такой же большой, как кит. Я подкрадусь медленно, как шлить, но могу появиться молниеносно, как шторм. От некоторых я получаю удары, но многим внушала страх. Я буду танцевать под музыку, хотя ничего не слышу слышу. Много имён, но суть одна. Я медленна, как улитка, но от меня ты не сможешь убежать. Что это?',
    answer: 'shadow',
    options: ['fear', 'wind', 'sprinter', 'shadow'],
    explain: 'shadow',
    id: 18,
  },
  'Riddle-20': {
    riddle: 'There is an ancient invention, still used in some parts of the world today, that allows people to see through walls. What is it?',
    translate: 'Древнее изобретение, которое позволяет людям видеть сквозь стены. Используется в некоторых частях мира до сих пор. Что это?',
    answer: 'window',
    options: ['magic', 'hammer', 'window', 'superglasses'],
    explain: 'window',
    id: 20,
  },
  'Riddle-21': {
    riddle: 'What is always in front of you but can’t be seen?',
    translate: 'Что всегда перед тобой, но не видно?',
    answer: 'future',
    options: ['happiness', 'future', 'lie', 'nose'],
    explain: 'future',
    id: 21,
  },
  'Riddle-22': {
    riddle: 'You walk into a room that contains a match, a kerosene lamp, a candle and a fireplace. What would you light first?',
    translate: 'Вы входите в комнату, в которой есть спичка, керосиновая лампа, свеча и камин. Что бы вы зажгли в первую очередь?',
    answer: 'match',
    options: ['lamp', 'fireplace', 'match', 'candle'],
    explain: 'match',
    id: 22,
  },
  'Riddle-23': {
    riddle: 'What can’t talk but will reply when spoken to?',
    translate: 'Что не может говорить, но ответит, когда с ним разговаривают?',
    answer: 'echo',
    options: ['echo', 'ghost', 'carrot', 'wind'],
    explain: 'echo',
    id: 23,
  },
  'Riddle-24': {
    riddle: 'The more of this there is, the less you see. What is it?',
    translate: 'Чем больше этого вокруг тебя, тем меньше ты видишь. Что это?',
    answer: 'darkness',
    options: ['people', 'alcohol', 'darkness', 'socks'],
    explain: 'darkness',
    id: 24,
  },
  'Riddle-25': {
    riddle: 'I’m light as a feather, yet the strongest person can’t hold me for ten minutes. What am I?',
    translate: 'Я легок, как перышко, но самый сильный человек не может удержать меня десять минут. Что я?',
    answer: 'breath',
    options: ['feather', 'breath', 'mouse', 'fly'],
    explain: 'breath',
    id: 25,
  },
  'Riddle-26': {
    riddle: 'What has many needles, but doesn’t sew?',
    translate: 'У чего много иголок, но не шьет?',
    answer: 'cactus',
    options: ['cactus', 'sewing machine', 'cold', 'tailor'],
    explain: 'cactus',
    id: 26,
  },
  'Riddle-27': {
    riddle: 'What has many teeth, but can’t bite?',
    translate: 'У чего много зубов, но не кусается?',
    answer: 'comb',
    options: ['shark', 'human', 'comb', 'spider'],
    explain: 'comb',
    id: 27,
  },
  'Riddle-28': {
    riddle: 'I am an odd number. Take away a letter and I become even. What number am I?',
    translate: 'Я нечётная цифра. Уберите одну букву и эта цифра станет чётной. О какой цифре речь?',
    answer: 'seven',
    options: ['three', 'five', 'seven', 'nine'],
    explain: 'seven',
    id: 28,
  },
};

const RIDDLES_3 = {

};

const RIDDLES_4 = {

};

const RIDDLES_5 = {

};

const RIDDLES_6 = {

};

/* Different lights do make me strange, thus into different sizes I will change. What am I?
I am the pupil of an eye. */

/* My thunder comes before the lightning; My lightning comes before the clouds;
My rain dries all the land it touches. What am I?

A volcano. */

const ALL_RIDDLES = [RIDDLES_1, RIDDLES_2, RIDDLES_3, RIDDLES_4, RIDDLES_5, RIDDLES_6];
export default ALL_RIDDLES;
