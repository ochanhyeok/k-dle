type Locale = "ko" | "es";

interface DramaLocalized {
  genre: string[];
  synopsisKeywords: string[];
  famousQuote: string;
}

const data: Record<Locale, Record<string, DramaLocalized>> = {
  ko: {
    // ===== EASY (15) - Global Hits =====
    "squid-game": {
      genre: ["스릴러", "드라마", "서바이벌"],
      synopsisKeywords: ["어린 시절 놀이", "빚", "생존"],
      famousQuote: "우리는 말이 아니야. 우리는 사람이라고.",
    },
    "crash-landing-on-you": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["패러글라이딩", "북한", "금지된 사랑"],
      famousQuote: "가끔은 잘못 탄 기차가 올바른 목적지로 데려다줄 때도 있어요.",
    },
    "goblin": {
      genre: ["로맨스", "판타지", "드라마"],
      synopsisKeywords: ["불멸", "신부", "도깨비 검"],
      famousQuote: "너와 함께한 시간 모두 눈부셨다. 날이 좋아서, 날이 좋지 않아서, 날이 적당해서.",
    },
    "all-of-us-are-dead": {
      genre: ["공포", "액션", "스릴러"],
      synopsisKeywords: ["좀비", "고등학교", "갇힌"],
      famousQuote: "이런 세상에서, 우리를 인간으로 만드는 건 뭘까?",
    },
    "my-love-from-the-star": {
      genre: ["로맨스", "코미디", "판타지"],
      synopsisKeywords: ["외계인", "여배우", "400년"],
      famousQuote: "세상에서 가장 무서운 게 뭔지 알아? 그리움이 점점 길어지는 거야.",
    },
    "extraordinary-attorney-woo": {
      genre: ["드라마", "코미디", "법정"],
      synopsisKeywords: ["자폐", "변호사", "고래"],
      famousQuote: "우영우. 거꾸로 해도 우영우. 기역니은디귿 해도 우영우.",
    },
    "vincenzo": {
      genre: ["액션", "코미디", "범죄"],
      synopsisKeywords: ["마피아", "금괴", "정의"],
      famousQuote: "내가 진짜 악당이 어떤 건지 보여줄게.",
    },
    "itaewon-class": {
      genre: ["드라마", "로맨스", "비즈니스"],
      synopsisKeywords: ["술집", "복수", "전과자"],
      famousQuote: "내 문제는 타협을 안 한다는 거야. 그래서 뭐? 나는 원래 그래.",
    },
    "business-proposal": {
      genre: ["로맨스", "코미디"],
      synopsisKeywords: ["소개팅", "사장", "가짜 신분"],
      famousQuote: "제가 반하게 만들 테니까 각오하세요.",
    },
    "reply-1988": {
      genre: ["코미디", "드라마", "로맨스"],
      synopsisKeywords: ["동네", "1980년대", "우정"],
      famousQuote: "잘 가, 나의 청춘. 잘 가, 쌍문동.",
    },
    "the-glory": {
      genre: ["스릴러", "드라마", "복수"],
      synopsisKeywords: ["학교폭력", "복수", "인내"],
      famousQuote: "나는 행복해지려고 이러는 게 아니야. 너한테서 다 빼앗으려고 하는 거야.",
    },
    "moving": {
      genre: ["액션", "판타지", "드라마"],
      synopsisKeywords: ["초능력", "부모", "첩보"],
      famousQuote: "부모는 아이를 지키기 위해서 무엇이든 한다. 그게 부모의 초능력이다.",
    },
    "alchemy-of-souls": {
      genre: ["판타지", "로맨스", "액션"],
      synopsisKeywords: ["환혼", "술사", "고대 왕국"],
      famousQuote: "내 영혼이 바뀌어도 내 마음은 너를 기억할 거야.",
    },
    "sweet-home": {
      genre: ["공포", "판타지", "스릴러"],
      synopsisKeywords: ["괴물", "아파트", "욕망"],
      famousQuote: "괴물은 태어나는 게 아니야. 놓지 못하는 욕망에서 만들어지는 거야.",
    },
    "kingdom": {
      genre: ["공포", "스릴러", "사극"],
      synopsisKeywords: ["좀비", "조선", "역병"],
      famousQuote: "문제는 살아 움직이는 시체가 아니라, 죽은 것처럼 사는 산 자들이다.",
    },

    // ===== MEDIUM (20) - Popular among K-Drama fans =====
    "signal": {
      genre: ["범죄", "스릴러", "판타지"],
      synopsisKeywords: ["무전기", "미제 사건", "시간 연결"],
      famousQuote: "과거는 바뀔 수 있어. 나는 그렇게 믿어.",
    },
    "hospital-playlist": {
      genre: ["코미디", "드라마", "의학"],
      synopsisKeywords: ["의사들", "밴드", "우정"],
      famousQuote: "사랑하는 사람들과 함께하면 매일이 특별해.",
    },
    "sky-castle": {
      genre: ["드라마", "스릴러", "풍자"],
      synopsisKeywords: ["엘리트 교육", "엄마들", "비밀"],
      famousQuote: "내가 가장 두려운 건 실패가 아니라, 내 아이의 증오야.",
    },
    "mr-sunshine": {
      genre: ["사극", "로맨스", "액션"],
      synopsisKeywords: ["독립", "조선", "군인"],
      famousQuote: "이건 내가 떠났던 그 조선이 아니야. 그리고 당신이 내가 돌아온 이유요.",
    },
    "hometown-cha-cha-cha": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["바닷가 마을", "치과의사", "만능 청년"],
      famousQuote: "때로는 가장 복잡한 문제에 가장 단순한 답이 있어.",
    },
    "nevertheless": {
      genre: ["로맨스", "드라마"],
      synopsisKeywords: ["미대", "밀당", "나비"],
      famousQuote: "안 되는 걸 알면서도, 그래도 끌려.",
    },
    "true-beauty": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["화장", "학교폭력", "정체성"],
      famousQuote: "진정한 아름다움은 얼굴에 있는 게 아니야. 진짜 네가 누구인가에 있어.",
    },
    "twenty-five-twenty-one": {
      genre: ["로맨스", "드라마", "스포츠"],
      synopsisKeywords: ["펜싱", "1998 IMF 위기", "청춘"],
      famousQuote: "결말이 바뀌더라도, 그 순간들은 진짜였어.",
    },
    "our-beloved-summer": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["다큐멘터리", "전 연인", "재회"],
      famousQuote: "잊은 줄 알았어. 알고 보니 그리움에 익숙해진 거였어.",
    },
    "my-mister": {
      genre: ["드라마", "인생"],
      synopsisKeywords: ["고난", "공감", "치유"],
      famousQuote: "그냥 견뎌. 이겨낼 수 있어. 버텨.",
    },
    "when-the-camellia-blooms": {
      genre: ["로맨스", "코미디", "스릴러"],
      synopsisKeywords: ["싱글맘", "술집 주인", "작은 마을"],
      famousQuote: "누군가를 사랑하는 데 누구의 허락도 필요 없어.",
    },
    "start-up": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["IT 스타트업", "편지", "샌드박스"],
      famousQuote: "인생에 정답은 없어. 선택하고 그걸 정답으로 만들면 돼.",
    },
    "its-okay-to-not-be-okay": {
      genre: ["로맨스", "드라마", "판타지"],
      synopsisKeywords: ["동화", "정신건강", "보호자"],
      famousQuote: "누구나 풀어야 할 문제를 안고 태어나. 그게 인생을 흥미롭게 만드는 거야.",
    },
    "weightlifting-fairy-kim-bok-joo": {
      genre: ["로맨스", "코미디", "스포츠"],
      synopsisKeywords: ["역도", "대학교", "첫사랑"],
      famousQuote: "괜찮아. 잘하고 있어. 스웩!",
    },
    "strong-woman-do-bong-soon": {
      genre: ["로맨스", "코미디", "액션"],
      synopsisKeywords: ["괴력", "경호원", "대표"],
      famousQuote: "나 작아 보여도, 이 세상을 뒤집어 놓을 수 있어.",
    },
    "while-you-were-sleeping": {
      genre: ["로맨스", "판타지", "법정"],
      synopsisKeywords: ["예지몽", "검사", "운명"],
      famousQuote: "미래를 볼 수 있다면, 당신을 위해 바꾸겠어.",
    },
    "w-two-worlds": {
      genre: ["로맨스", "판타지", "스릴러"],
      synopsisKeywords: ["웹툰", "평행세계", "만화"],
      famousQuote: "내 세상에서 당신만이 진짜야.",
    },
    "hotel-del-luna": {
      genre: ["로맨스", "판타지", "드라마"],
      synopsisKeywords: ["유령 호텔", "원한", "사후세계"],
      famousQuote: "원한 때문에 이 세상에 남은 사람들은 놓아주는 법을 몰라.",
    },
    "flower-of-evil": {
      genre: ["스릴러", "미스터리", "로맨스"],
      synopsisKeywords: ["숨겨진 정체", "형사 아내", "사이코패스"],
      famousQuote: "감정을 느끼지 못하는 사람도 사랑할 수 있을까?",
    },
    "moon-lovers-scarlet-heart-ryeo": {
      genre: ["로맨스", "사극", "판타지"],
      synopsisKeywords: ["시간 여행", "고려 시대", "왕자들"],
      famousQuote: "다른 세상에서 만났더라면, 달라질 수 있었을까?",
    },

    // ===== HARD (15) - For enthusiasts =====
    "misaeng": {
      genre: ["드라마", "인생"],
      synopsisKeywords: ["직장 생활", "바둑", "인턴"],
      famousQuote: "미완성된 삶도 여전히 살 가치가 있는 삶이다.",
    },
    "my-liberation-notes": {
      genre: ["드라마", "로맨스", "인생"],
      synopsisKeywords: ["통근", "시골 생활", "해방"],
      famousQuote: "누군가 나를 숭배해 줬으면 좋겠다. 나도 누군가를 숭배하고 싶다.",
    },
    "mother": {
      genre: ["드라마", "미스터리"],
      synopsisKeywords: ["아동학대", "유괴", "모성애"],
      famousQuote: "오늘부터 내가 이 아이의 엄마다.",
    },
    "save-me": {
      genre: ["스릴러", "미스터리", "드라마"],
      synopsisKeywords: ["사이비 종교", "시골 마을", "구출"],
      famousQuote: "구해줘. 제발, 누가 나 좀 구해줘.",
    },
    "beyond-evil": {
      genre: ["스릴러", "미스터리", "범죄"],
      synopsisKeywords: ["연쇄살인범", "작은 마을", "의심"],
      famousQuote: "누구나 마음속에 괴물이 있어. 문제는 누가 그걸 풀어놓느냐야.",
    },
    "stranger": {
      genre: ["범죄", "스릴러", "미스터리"],
      synopsisKeywords: ["검사", "부패", "무감정"],
      famousQuote: "진실에는 감정이 필요 없다. 증거만 있으면 된다.",
    },
    "the-light-in-your-eyes": {
      genre: ["드라마", "판타지", "인생"],
      synopsisKeywords: ["시간 조작", "노화", "후회"],
      famousQuote: "내 인생의 모든 순간이 눈부셨다. 날이 좋아서, 날이 좋지 않아서, 날이 적당해서.",
    },
    "nobody-knows": {
      genre: ["범죄", "미스터리", "드라마"],
      synopsisKeywords: ["미제 사건", "청소년", "형사"],
      famousQuote: "아무도 관심을 갖지 않는 아이들이 우리를 가장 필요로 하는 아이들이야.",
    },
    "prison-playbook": {
      genre: ["코미디", "드라마"],
      synopsisKeywords: ["교도소", "야구", "우정"],
      famousQuote: "이 담장 안에서 내 인생에서 가장 진실한 친구들을 만났다.",
    },
    "doctor-prisoner": {
      genre: ["스릴러", "의학", "드라마"],
      synopsisKeywords: ["교도소 의사", "복수", "재벌"],
      famousQuote: "교도소에서는 의사도 가장 강력한 사람이 될 수 있다.",
    },
    "navillera": {
      genre: ["드라마", "인생"],
      synopsisKeywords: ["발레", "노인의 꿈", "멘토링"],
      famousQuote: "꿈을 좇기에 늦은 때란 없어. 그게 사는 거야.",
    },
    "move-to-heaven": {
      genre: ["드라마", "인생"],
      synopsisKeywords: ["유품 정리", "아스퍼거", "망자의 이야기"],
      famousQuote: "죽은 사람들은 물건을 남긴다. 그 물건들이 그들이 하지 못한 이야기를 들려준다.",
    },
    "dp": {
      genre: ["드라마", "범죄", "군사"],
      synopsisKeywords: ["탈영병 추적", "군대 가혹행위", "징병"],
      famousQuote: "그들은 약해서 도망친 게 아니야. 아무도 지켜주지 않아서 도망친 거야.",
    },
    "juvenile-justice": {
      genre: ["법정", "범죄", "드라마"],
      synopsisKeywords: ["소년법원", "판사", "청소년 범죄"],
      famousQuote: "아이의 범죄는 사회의 실패다.",
    },
    "little-women": {
      genre: ["스릴러", "미스터리", "드라마"],
      synopsisKeywords: ["세 자매", "부", "음모"],
      famousQuote: "우리는 가난했지만, 약하지는 않았다.",
    },

    // ===== NEW ADDITIONS (25) =====

    // --- EASY (8) ---
    "queen-of-tears": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["재벌 상속녀", "이혼", "뇌종양"],
      famousQuote: "매일 싸워도 다시 태어나도 난 또 당신을 선택할 거예요.",
    },
    "lovely-runner": {
      genre: ["로맨스", "코미디", "판타지"],
      synopsisKeywords: ["시간 여행", "K-팝 아이돌", "팬걸"],
      famousQuote: "내가 미래를 바꿀게, 널 업고 뛰어서라도.",
    },
    "descendants-of-the-sun": {
      genre: ["로맨스", "액션", "드라마"],
      synopsisKeywords: ["군인", "의사", "전쟁터"],
      famousQuote: "내가 사는 이유는 당신 때문이야. 당신이 나의 전부야.",
    },
    "boys-over-flowers": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["부잣집 아들들", "가난한 소녀", "F4"],
      famousQuote: "사랑하는 사람을 빼앗기는 기분이 어떤 건지 알아?",
    },
    "marry-my-husband": {
      genre: ["로맨스", "판타지", "복수"],
      synopsisKeywords: ["시간 역행", "배신", "재혼 복수"],
      famousQuote: "이번에는 내 것이었던 모든 걸 되찾을 거야.",
    },
    "when-the-phone-rings": {
      genre: ["로맨스", "미스터리", "드라마"],
      synopsisKeywords: ["정략결혼", "납치", "선택적 함묵증"],
      famousQuote: "당신을 잃을 수도 있는 사람이라고 단 한 번도 생각한 적 없어.",
    },
    "the-penthouse": {
      genre: ["드라마", "스릴러", "미스터리"],
      synopsisKeywords: ["고급 아파트", "교육 전쟁", "살인"],
      famousQuote: "헤라팰리스에는 친구가 없어. 미소 짓는 척하는 적만 있을 뿐이야.",
    },
    "doctor-slump": {
      genre: ["로맨스", "코미디", "의학"],
      synopsisKeywords: ["라이벌", "커리어 위기", "옥상 이웃"],
      famousQuote: "때로는 당신을 치유해 줄 수 있는 사람이 가장 예상 못한 사람이야.",
    },

    // --- MEDIUM (9) ---
    "secret-garden": {
      genre: ["로맨스", "코미디", "판타지"],
      synopsisKeywords: ["영혼 교환", "스턴트우먼", "백화점 대표"],
      famousQuote: "이게 최선이야? 그럼 내가 갈게.",
    },
    "the-heirs": {
      genre: ["로맨스", "드라마"],
      synopsisKeywords: ["재벌 후계자", "계급 차이", "고등학교"],
      famousQuote: "너를 좋아하는 건지, 잃기 싫은 건지, 이제 모르겠어.",
    },
    "king-the-land": {
      genre: ["로맨스", "코미디"],
      synopsisKeywords: ["호텔", "미소 여왕", "재벌 후계자"],
      famousQuote: "당신의 미소가 세상에서 가장 아름다워요.",
    },
    "my-demon": {
      genre: ["로맨스", "판타지", "코미디"],
      synopsisKeywords: ["악마", "계약 결혼", "잃어버린 능력"],
      famousQuote: "널 만나기 전까진 불멸이었어. 이제는 시간을 잃는 게 두려워.",
    },
    "castaway-diva": {
      genre: ["코미디", "드라마", "음악"],
      synopsisKeywords: ["무인도", "가수의 꿈", "15년"],
      famousQuote: "아무도 없는 섬에서도 나는 노래를 멈추지 않았다.",
    },
    "taxi-driver": {
      genre: ["액션", "범죄", "드라마"],
      synopsisKeywords: ["복수 대리 택시", "범죄 피해자", "자경단"],
      famousQuote: "법이 닿지 않는 곳, 우리가 간다.",
    },
    "love-next-door": {
      genre: ["로맨스", "코미디"],
      synopsisKeywords: ["소꿉친구", "인생 리셋", "엄마들의 우정"],
      famousQuote: "다 잊은 줄 알았는데, 내 마음은 한 번도 떠난 적이 없었어.",
    },
    "city-hunter": {
      genre: ["액션", "로맨스", "스릴러"],
      synopsisKeywords: ["복수", "청와대", "이중 정체"],
      famousQuote: "영웅이 되고 싶은 게 아니야. 진실만 원해.",
    },
    "twinkling-watermelon": {
      genre: ["코미디", "드라마", "판타지"],
      synopsisKeywords: ["시간 여행", "코다", "밴드"],
      famousQuote: "음악은 말로 할 수 없는 것을 전해준다. 특히 들을 수 없는 사람들에게.",
    },

    // --- HARD (8) ---
    "healer": {
      genre: ["액션", "로맨스", "스릴러"],
      synopsisKeywords: ["야간 배달부", "기자", "해적 방송"],
      famousQuote: "좋은 사람이 되고 싶은 게 아니야. 그냥 널 지키고 싶어.",
    },
    "a-shop-for-killers": {
      genre: ["액션", "드라마", "미스터리"],
      synopsisKeywords: ["무기 상점", "암살자 삼촌", "생존"],
      famousQuote: "진짜 쇼핑은 네가 사냥감이 됐을 때 시작된다.",
    },
    "see-you-in-my-19th-life": {
      genre: ["로맨스", "판타지", "드라마"],
      synopsisKeywords: ["환생", "전생의 기억", "재회"],
      famousQuote: "모든 생을 거쳐, 내 마음은 언제나 당신에게로 돌아와.",
    },
    "under-the-queens-umbrella": {
      genre: ["사극", "코미디", "드라마"],
      synopsisKeywords: ["왕비", "말썽꾸러기 왕자들", "왕실 교육"],
      famousQuote: "엄마는 자식을 위해서라면 기꺼이 악당이 될 수 있다.",
    },
    "my-name": {
      genre: ["액션", "범죄", "스릴러"],
      synopsisKeywords: ["잠입 수사", "마약 조직", "아버지의 살해"],
      famousQuote: "내 이름도, 내 인생도, 전부 팔았어. 오직 복수를 위해.",
    },
    "mask-girl": {
      genre: ["스릴러", "코미디", "범죄"],
      synopsisKeywords: ["가면 스트리머", "외모 집착", "정체성"],
      famousQuote: "가면 뒤에서 그녀는 드디어 자유로웠다. 하지만 자유에는 대가가 따랐다.",
    },
    "coffee-prince": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["성별 위장", "커피숍", "금지된 감정"],
      famousQuote: "남자든 외계인이든 상관없어. 그냥 너랑 함께하고 싶어.",
    },
    "vagabond": {
      genre: ["액션", "스릴러", "미스터리"],
      synopsisKeywords: ["비행기 추락", "음모", "스턴트맨"],
      famousQuote: "진실은 감춘다고 사라지지 않는다.",
    },
  },

  es: {
    // ===== EASY (15) - Global Hits =====
    "squid-game": {
      genre: ["Thriller", "Drama", "Supervivencia"],
      synopsisKeywords: ["juegos infantiles", "deuda", "supervivencia"],
      famousQuote: "No somos caballos. Somos seres humanos.",
    },
    "crash-landing-on-you": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["parapente", "Corea del Norte", "amor prohibido"],
      famousQuote: "A veces el tren equivocado te lleva al destino correcto.",
    },
    "goblin": {
      genre: ["Romance", "Fantasia", "Drama"],
      synopsisKeywords: ["inmortal", "novia", "espada del goblin"],
      famousQuote: "Cada momento que pase contigo brillaba. Porque el clima era bueno, porque el clima era malo, porque el clima era suficiente.",
    },
    "all-of-us-are-dead": {
      genre: ["Terror", "Accion", "Thriller"],
      synopsisKeywords: ["zombi", "instituto", "atrapados"],
      famousQuote: "En un mundo como este, ?que nos hace humanos?",
    },
    "my-love-from-the-star": {
      genre: ["Romance", "Comedia", "Fantasia"],
      synopsisKeywords: ["alienigena", "actriz", "400 anos"],
      famousQuote: "?Sabes que es lo mas aterrador del mundo? Es cuando esos momentos de extranar a alguien se hacen mas largos.",
    },
    "extraordinary-attorney-woo": {
      genre: ["Drama", "Comedia", "Legal"],
      synopsisKeywords: ["autismo", "abogada", "ballenas"],
      famousQuote: "Woo Young Woo. Se lee igual de adelante hacia atras. Woo Young Woo.",
    },
    "vincenzo": {
      genre: ["Accion", "Comedia", "Crimen"],
      synopsisKeywords: ["mafia", "oro", "justicia"],
      famousQuote: "Te voy a mostrar como es un verdadero villano.",
    },
    "itaewon-class": {
      genre: ["Drama", "Romance", "Negocios"],
      synopsisKeywords: ["bar", "venganza", "ex convicto"],
      famousQuote: "Mi problema es que no hago concesiones. ?Y que? Asi soy yo.",
    },
    "business-proposal": {
      genre: ["Romance", "Comedia"],
      synopsisKeywords: ["cita a ciegas", "jefe", "identidad falsa"],
      famousQuote: "Hare que te enamores de mi, asi que preparate.",
    },
    "reply-1988": {
      genre: ["Comedia", "Drama", "Romance"],
      synopsisKeywords: ["vecindario", "anos 80", "amistad"],
      famousQuote: "Adios, mi juventud. Adios, Ssangmundong.",
    },
    "the-glory": {
      genre: ["Thriller", "Drama", "Venganza"],
      synopsisKeywords: ["acoso escolar", "venganza", "paciencia"],
      famousQuote: "No hago esto porque quiera ser feliz. Quiero quitarte todo lo que tienes.",
    },
    "moving": {
      genre: ["Accion", "Fantasia", "Drama"],
      synopsisKeywords: ["superpoderes", "padres", "espionaje"],
      famousQuote: "Los padres haran cualquier cosa por proteger a sus hijos. Ese es su superpoder.",
    },
    "alchemy-of-souls": {
      genre: ["Fantasia", "Romance", "Accion"],
      synopsisKeywords: ["cambio de alma", "magos", "reino antiguo"],
      famousQuote: "Aunque mi alma cambie, mi corazon te recordara.",
    },
    "sweet-home": {
      genre: ["Terror", "Fantasia", "Thriller"],
      synopsisKeywords: ["monstruos", "apartamento", "deseo"],
      famousQuote: "Los monstruos no nacen. Se crean a partir de los deseos que no puedes soltar.",
    },
    "kingdom": {
      genre: ["Terror", "Thriller", "Historico"],
      synopsisKeywords: ["zombi", "Joseon", "plaga"],
      famousQuote: "El problema no son los muertos vivientes, sino los vivos que actuan como si estuvieran muertos.",
    },

    // ===== MEDIUM (20) - Popular among K-Drama fans =====
    "signal": {
      genre: ["Crimen", "Thriller", "Fantasia"],
      synopsisKeywords: ["walkie-talkie", "caso sin resolver", "conexion temporal"],
      famousQuote: "El pasado puede cambiar. Eso es lo que creo.",
    },
    "hospital-playlist": {
      genre: ["Comedia", "Drama", "Medico"],
      synopsisKeywords: ["doctores", "banda", "amistad"],
      famousQuote: "Cada dia es especial cuando lo pasas con la gente que amas.",
    },
    "sky-castle": {
      genre: ["Drama", "Thriller", "Satira"],
      synopsisKeywords: ["educacion de elite", "madres", "secretos"],
      famousQuote: "Lo que mas temo no es el fracaso, sino el odio de mi hijo.",
    },
    "mr-sunshine": {
      genre: ["Historico", "Romance", "Accion"],
      synopsisKeywords: ["independencia", "Joseon", "soldado"],
      famousQuote: "Este no es el Joseon que una vez deje. Y tu eres la razon por la que volvi.",
    },
    "hometown-cha-cha-cha": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["pueblo costero", "dentista", "hombre de mil oficios"],
      famousQuote: "A veces los problemas mas complicados tienen las soluciones mas simples.",
    },
    "nevertheless": {
      genre: ["Romance", "Drama"],
      synopsisKeywords: ["escuela de arte", "coqueteo", "mariposas"],
      famousQuote: "Se que no deberia, pero aun asi quiero.",
    },
    "true-beauty": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["maquillaje", "acoso escolar", "identidad"],
      famousQuote: "La verdadera belleza no esta en tu rostro. Esta en quien realmente eres.",
    },
    "twenty-five-twenty-one": {
      genre: ["Romance", "Drama", "Deportes"],
      synopsisKeywords: ["esgrima", "crisis del FMI de 1998", "juventud"],
      famousQuote: "Aunque el final cambie, esos momentos fueron reales.",
    },
    "our-beloved-summer": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["documental", "ex amantes", "reencuentro"],
      famousQuote: "Crei que te habia olvidado. Resulta que solo me acostumbre a extranarte.",
    },
    "my-mister": {
      genre: ["Drama", "Vida"],
      synopsisKeywords: ["dificultades", "empatia", "sanacion"],
      famousQuote: "Solo aguanta. Lo superaras. Solo resiste.",
    },
    "when-the-camellia-blooms": {
      genre: ["Romance", "Comedia", "Thriller"],
      synopsisKeywords: ["madre soltera", "duena de bar", "pueblo pequeno"],
      famousQuote: "Amar a alguien no requiere el permiso de nadie.",
    },
    "start-up": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["startup tecnologica", "cartas", "sandbox"],
      famousQuote: "En la vida no hay respuestas correctas. Solo eliges y la conviertes en la respuesta correcta.",
    },
    "its-okay-to-not-be-okay": {
      genre: ["Romance", "Drama", "Fantasia"],
      synopsisKeywords: ["cuentos de hadas", "salud mental", "cuidador"],
      famousQuote: "Todos nacen con un problema que resolver. Eso es lo que hace la vida interesante.",
    },
    "weightlifting-fairy-kim-bok-joo": {
      genre: ["Romance", "Comedia", "Deportes"],
      synopsisKeywords: ["halterofilia", "universidad", "primer amor"],
      famousQuote: "Esta bien. Lo estas haciendo genial. !Swag!",
    },
    "strong-woman-do-bong-soon": {
      genre: ["Romance", "Comedia", "Accion"],
      synopsisKeywords: ["superfuerza", "guardaespaldas", "CEO"],
      famousQuote: "Puedo parecer pequena, pero puedo poner este mundo patas arriba.",
    },
    "while-you-were-sleeping": {
      genre: ["Romance", "Fantasia", "Legal"],
      synopsisKeywords: ["suenos profeticos", "fiscal", "destino"],
      famousQuote: "Si pudiera ver el futuro, lo cambiaria por ti.",
    },
    "w-two-worlds": {
      genre: ["Romance", "Fantasia", "Thriller"],
      synopsisKeywords: ["webtoon", "mundo paralelo", "manhwa"],
      famousQuote: "En mi mundo, tu eres lo unico real.",
    },
    "hotel-del-luna": {
      genre: ["Romance", "Fantasia", "Drama"],
      synopsisKeywords: ["hotel de fantasmas", "rencor", "mas alla"],
      famousQuote: "Las personas que se quedan en este mundo por sus rencores no saben como dejar ir.",
    },
    "flower-of-evil": {
      genre: ["Thriller", "Misterio", "Romance"],
      synopsisKeywords: ["identidad oculta", "esposa detective", "psicopata"],
      famousQuote: "?Puede alguien que no siente emociones amar de todos modos?",
    },
    "moon-lovers-scarlet-heart-ryeo": {
      genre: ["Romance", "Historico", "Fantasia"],
      synopsisKeywords: ["viaje en el tiempo", "dinastia Goryeo", "principes"],
      famousQuote: "Si nos hubieramos conocido en otro mundo, ?habrian sido las cosas diferentes?",
    },

    // ===== HARD (15) - For enthusiasts =====
    "misaeng": {
      genre: ["Drama", "Vida"],
      synopsisKeywords: ["vida de oficina", "baduk", "pasante"],
      famousQuote: "Una vida incompleta sigue siendo una vida que vale la pena vivir.",
    },
    "my-liberation-notes": {
      genre: ["Drama", "Romance", "Vida"],
      synopsisKeywords: ["viaje al trabajo", "vida rural", "liberacion"],
      famousQuote: "Quiero que alguien me venere. Y yo tambien quiero venerar a alguien.",
    },
    "mother": {
      genre: ["Drama", "Misterio"],
      synopsisKeywords: ["abuso infantil", "secuestro", "amor maternal"],
      famousQuote: "A partir de hoy, yo soy la madre de esta nina.",
    },
    "save-me": {
      genre: ["Thriller", "Misterio", "Drama"],
      synopsisKeywords: ["secta", "pueblo rural", "rescate"],
      famousQuote: "Salvenme. Por favor, alguien salveme.",
    },
    "beyond-evil": {
      genre: ["Thriller", "Misterio", "Crimen"],
      synopsisKeywords: ["asesino en serie", "pueblo pequeno", "sospecha"],
      famousQuote: "Todos tienen un monstruo dentro. La pregunta es quien lo deja salir.",
    },
    "stranger": {
      genre: ["Crimen", "Thriller", "Misterio"],
      synopsisKeywords: ["fiscal", "corrupcion", "sin emociones"],
      famousQuote: "La verdad no necesita emociones. Solo necesita pruebas.",
    },
    "the-light-in-your-eyes": {
      genre: ["Drama", "Fantasia", "Vida"],
      synopsisKeywords: ["manipulacion del tiempo", "envejecimiento", "arrepentimiento"],
      famousQuote: "Cada momento de mi vida fue deslumbrante. Porque el clima era bueno, porque el clima era malo, porque el clima era suficiente.",
    },
    "nobody-knows": {
      genre: ["Crimen", "Misterio", "Drama"],
      synopsisKeywords: ["caso sin resolver", "juventud", "detective"],
      famousQuote: "Los ninos a los que nadie presta atencion son los que mas nos necesitan.",
    },
    "prison-playbook": {
      genre: ["Comedia", "Drama"],
      synopsisKeywords: ["prision", "beisbol", "amistad"],
      famousQuote: "Dentro de estos muros, encontre a los amigos mas verdaderos que he tenido.",
    },
    "doctor-prisoner": {
      genre: ["Thriller", "Medico", "Drama"],
      synopsisKeywords: ["medico de prision", "venganza", "chaebol"],
      famousQuote: "En la prision, hasta un medico puede convertirse en la persona mas poderosa.",
    },
    "navillera": {
      genre: ["Drama", "Vida"],
      synopsisKeywords: ["ballet", "sueno de un anciano", "mentoria"],
      famousQuote: "Nunca es demasiado tarde para perseguir un sueno. Eso es lo que significa vivir.",
    },
    "move-to-heaven": {
      genre: ["Drama", "Vida"],
      synopsisKeywords: ["limpieza de pertenencias", "Asperger", "historias de los fallecidos"],
      famousQuote: "Los muertos dejan cosas atras. Esas cosas cuentan las historias que ellos no pudieron.",
    },
    "dp": {
      genre: ["Drama", "Crimen", "Militar"],
      synopsisKeywords: ["persecucion de desertores", "abuso militar", "servicio militar"],
      famousQuote: "No huyeron porque fueran debiles. Huyeron porque nadie los protegio.",
    },
    "juvenile-justice": {
      genre: ["Legal", "Crimen", "Drama"],
      synopsisKeywords: ["tribunal de menores", "jueza", "delincuencia juvenil"],
      famousQuote: "El crimen de un nino es el fracaso de la sociedad.",
    },
    "little-women": {
      genre: ["Thriller", "Misterio", "Drama"],
      synopsisKeywords: ["tres hermanas", "riqueza", "conspiracion"],
      famousQuote: "Eramos pobres, pero nunca fuimos debiles.",
    },

    // ===== NEW ADDITIONS (25) =====

    // --- EASY (8) ---
    "queen-of-tears": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["heredera chaebol", "divorcio", "tumor cerebral"],
      famousQuote: "Aunque peleemos todos los dias, te elegiria a ti cada vez.",
    },
    "lovely-runner": {
      genre: ["Romance", "Comedia", "Fantasia"],
      synopsisKeywords: ["viaje en el tiempo", "idol de K-pop", "fangirl"],
      famousQuote: "Cambiare el futuro, aunque tenga que cargarte y correr.",
    },
    "descendants-of-the-sun": {
      genre: ["Romance", "Accion", "Drama"],
      synopsisKeywords: ["soldado", "doctora", "zona de guerra"],
      famousQuote: "La razon por la que vivo eres tu. Tu eres mi todo.",
    },
    "boys-over-flowers": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["chicos ricos", "chica pobre", "F4"],
      famousQuote: "?Sabes lo que se siente cuando te arrebatan a la persona que amas?",
    },
    "marry-my-husband": {
      genre: ["Romance", "Fantasia", "Venganza"],
      synopsisKeywords: ["retroceso en el tiempo", "traicion", "venganza de nueva boda"],
      famousQuote: "Esta vez, recuperare todo lo que era mio.",
    },
    "when-the-phone-rings": {
      genre: ["Romance", "Misterio", "Drama"],
      synopsisKeywords: ["matrimonio arreglado", "secuestro", "mutismo selectivo"],
      famousQuote: "Nunca pense en ti como alguien que pudiera perder.",
    },
    "the-penthouse": {
      genre: ["Drama", "Thriller", "Misterio"],
      synopsisKeywords: ["apartamento de lujo", "guerra educativa", "asesinato"],
      famousQuote: "En el Palacio Hera no hay amigos. Solo enemigos que fingen sonreir.",
    },
    "doctor-slump": {
      genre: ["Romance", "Comedia", "Medico"],
      synopsisKeywords: ["rivales", "crisis profesional", "vecinos de azotea"],
      famousQuote: "A veces la persona que puede sanarte es la que menos esperas.",
    },

    // --- MEDIUM (9) ---
    "secret-garden": {
      genre: ["Romance", "Comedia", "Fantasia"],
      synopsisKeywords: ["intercambio de cuerpos", "doble de accion", "CEO de grandes almacenes"],
      famousQuote: "?Es lo mejor que puedes hacer? Entonces ire yo hacia ti.",
    },
    "the-heirs": {
      genre: ["Romance", "Drama"],
      synopsisKeywords: ["heredero chaebol", "division de clases", "instituto"],
      famousQuote: "?Me gustas? ?O no quiero perderte? Ya no lo se.",
    },
    "king-the-land": {
      genre: ["Romance", "Comedia"],
      synopsisKeywords: ["hotel", "reina de las sonrisas", "heredero chaebol"],
      famousQuote: "Tu sonrisa es lo mas hermoso del mundo.",
    },
    "my-demon": {
      genre: ["Romance", "Fantasia", "Comedia"],
      synopsisKeywords: ["demonio", "matrimonio por contrato", "poderes perdidos"],
      famousQuote: "Era inmortal hasta que te conoci. Ahora tengo miedo de perder el tiempo.",
    },
    "castaway-diva": {
      genre: ["Comedia", "Drama", "Musical"],
      synopsisKeywords: ["isla desierta", "sueno de cantante", "15 anos"],
      famousQuote: "Incluso en una isla sin nadie, nunca deje de cantar.",
    },
    "taxi-driver": {
      genre: ["Accion", "Crimen", "Drama"],
      synopsisKeywords: ["taxi de venganza", "victimas del crimen", "justicia vigilante"],
      famousQuote: "Vamos donde la ley no puede llegar.",
    },
    "love-next-door": {
      genre: ["Romance", "Comedia"],
      synopsisKeywords: ["amigos de la infancia", "reinicio de vida", "amistad de madres"],
      famousQuote: "Pense que habia seguido adelante, pero mi corazon nunca se fue de casa.",
    },
    "city-hunter": {
      genre: ["Accion", "Romance", "Thriller"],
      synopsisKeywords: ["venganza", "Casa Azul", "doble identidad"],
      famousQuote: "No quiero ser un heroe. Solo quiero la verdad.",
    },
    "twinkling-watermelon": {
      genre: ["Comedia", "Drama", "Fantasia"],
      synopsisKeywords: ["viaje en el tiempo", "CODA", "banda"],
      famousQuote: "La musica dice lo que las palabras nunca pueden, especialmente a quienes no pueden oir.",
    },

    // --- HARD (8) ---
    "healer": {
      genre: ["Accion", "Romance", "Thriller"],
      synopsisKeywords: ["mensajero nocturno", "periodista", "radio pirata"],
      famousQuote: "No quiero ser una buena persona. Solo quiero protegerte.",
    },
    "a-shop-for-killers": {
      genre: ["Accion", "Drama", "Misterio"],
      synopsisKeywords: ["tienda de armas", "tio asesino", "supervivencia"],
      famousQuote: "La verdadera compra comienza cuando tu eres el cazado.",
    },
    "see-you-in-my-19th-life": {
      genre: ["Romance", "Fantasia", "Drama"],
      synopsisKeywords: ["reencarnacion", "recuerdos pasados", "reconexion"],
      famousQuote: "A traves de cada vida, mi corazon siempre encuentra el camino de vuelta a ti.",
    },
    "under-the-queens-umbrella": {
      genre: ["Historico", "Comedia", "Drama"],
      synopsisKeywords: ["reina madre", "principes problematicos", "educacion real"],
      famousQuote: "Una madre esta dispuesta a convertirse en villana por sus hijos.",
    },
    "my-name": {
      genre: ["Accion", "Crimen", "Thriller"],
      synopsisKeywords: ["infiltrada", "cartel de drogas", "asesinato del padre"],
      famousQuote: "Vendi mi nombre, mi vida, todo. Todo por venganza.",
    },
    "mask-girl": {
      genre: ["Thriller", "Comedia", "Crimen"],
      synopsisKeywords: ["streamer enmascarada", "obsesion con la apariencia", "identidad"],
      famousQuote: "Detras de la mascara, finalmente era libre. Pero la libertad tenia un precio.",
    },
    "coffee-prince": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["disfraz de genero", "cafeteria", "sentimientos prohibidos"],
      famousQuote: "No me importa si eres hombre o alienigena. Solo quiero estar contigo.",
    },
    "vagabond": {
      genre: ["Accion", "Thriller", "Misterio"],
      synopsisKeywords: ["accidente aereo", "conspiracion", "doble de accion"],
      famousQuote: "La verdad no desaparece solo porque la encubras.",
    },
  },
};

export function getLocalizedDrama(id: string, locale: string): DramaLocalized | null {
  if (locale === "en") return null;
  return data[locale as Locale]?.[id] ?? null;
}
