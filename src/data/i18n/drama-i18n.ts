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

    // ===== ADDITIONAL — International Fan Favorites (25) =====

    // --- EASY (7) ---
    "hellbound": {
      genre: ["스릴러", "공포", "초자연"],
      synopsisKeywords: ["신의 칙령", "악마", "사이비"],
      famousQuote: "나는 신에 대해 모르고 관심도 없어. 이 세상은 사람들의 것이야.",
    },
    "the-world-of-the-married": {
      genre: ["드라마", "로맨스", "스릴러"],
      synopsisKeywords: ["불륜", "복수", "배신"],
      famousQuote: "이 세상에서 가장 믿었던 건 당신이었어. 그리고 당신이 모든 걸 파괴했어.",
    },
    "reborn-rich": {
      genre: ["드라마", "판타지", "복수"],
      synopsisKeywords: ["재벌", "환생", "복수"],
      famousQuote: "돈은 갖는 게 중요한 게 아니야. 필요한 사람들을 지배하는 거야.",
    },
    "when-life-gives-you-tangerines": {
      genre: ["로맨스", "드라마", "사극"],
      synopsisKeywords: ["제주도", "1960년대", "평생의 사랑"],
      famousQuote: "그들에게 봄은 꿈을 꾸는 계절이 아니라 꿈을 포기하는 계절이었다.",
    },
    "whats-wrong-with-secretary-kim": {
      genre: ["로맨스", "코미디"],
      synopsisKeywords: ["나르시시스트 상사", "비서", "사직"],
      famousQuote: "나의 모든 순간이 너였어 — 사랑할 때도, 아플 때도.",
    },
    "gyeongseong-creature": {
      genre: ["공포", "미스터리", "사극"],
      synopsisKeywords: ["1945 경성", "일제 강점기", "괴물"],
      famousQuote: "살아남으려면 스스로 괴물이 되어야 해.",
    },
    "doona": {
      genre: ["로맨스", "드라마"],
      synopsisKeywords: ["전직 아이돌", "대학생", "하숙집"],
      famousQuote: "아이돌은 그만뒀어. 하지만 나 자신을 그만둔 적은 없어.",
    },

    // --- MEDIUM (11) ---
    "weak-hero-class-1": {
      genre: ["액션", "드라마", "학교"],
      synopsisKeywords: ["학교 폭력", "두뇌 싸움꾼", "우정"],
      famousQuote: "선 넘지 마. 경고했어.",
    },
    "bloodhounds": {
      genre: ["액션", "스릴러", "범죄"],
      synopsisKeywords: ["복싱", "사채업자", "자경단"],
      famousQuote: "약한 자를 착취해서 돈 버는 건 양아치야. 우리는 복서야.",
    },
    "a-killer-paradox": {
      genre: ["범죄", "스릴러", "블랙 코미디"],
      synopsisKeywords: ["우발적 살인", "연쇄살인범", "형사"],
      famousQuote: "살인자를 죽이는 것도 살인인가? 답은 누가 묻느냐에 달렸어.",
    },
    "happiness": {
      genre: ["스릴러", "액션", "공포"],
      synopsisKeywords: ["아파트 봉쇄", "감염", "생존"],
      famousQuote: "어제 괜찮았다고 오늘도 괜찮을 거라는 보장은 없어.",
    },
    "love-in-the-moonlight": {
      genre: ["로맨스", "사극", "코미디"],
      synopsisKeywords: ["세자", "내시 변장", "조선 로맨스"],
      famousQuote: "시간을 되돌릴 수 있더라도, 다시 당신에게로 가는 길을 찾을 거야.",
    },
    "my-dearest": {
      genre: ["로맨스", "사극", "드라마"],
      synopsisKeywords: ["청 침략", "조선", "금지된 사랑"],
      famousQuote: "전쟁 속에서도, 죽음 속에서도, 내 마음은 오직 당신만 알아.",
    },
    "the-uncanny-counter": {
      genre: ["초자연", "액션", "드라마"],
      synopsisKeywords: ["악귀", "국수 가게", "카운터"],
      famousQuote: "우리는 악귀를 사냥해. 하지만 진짜 무기는 우리 사이의 유대야.",
    },
    "the-judge-from-hell": {
      genre: ["초자연", "범죄", "로맨스"],
      synopsisKeywords: ["악마 판사", "심판", "구원"],
      famousQuote: "지옥에서 왔어, 산 자를 심판하려고. 하지만 산 자들이 자비를 가르쳐줬어.",
    },
    "family-by-choice": {
      genre: ["로맨스", "코미디", "가족"],
      synopsisKeywords: ["만든 가족", "재회", "어린 시절 유대"],
      famousQuote: "가족은 피가 아니야. 모두가 떠날 때 남아있는 사람이야.",
    },
    "the-atypical-family": {
      genre: ["판타지", "로맨스", "드라마"],
      synopsisKeywords: ["초능력", "우울증", "가족 기능 장애"],
      famousQuote: "우리는 히어로가 아니야. 하지만 서로를 위해서는 노력할 수 있어.",
    },
    "bon-appetit-your-majesty": {
      genre: ["로맨스", "판타지", "사극"],
      synopsisKeywords: ["타임슬립", "조선 셰프", "폭군 왕"],
      famousQuote: "폭군의 마음으로 가는 길은 그의 위장을 통해서야.",
    },

    // --- HARD (7) ---
    "like-flowers-in-sand": {
      genre: ["코미디", "미스터리", "로맨스"],
      synopsisKeywords: ["씨름", "작은 마을", "소꿉친구 재회"],
      famousQuote: "모래 속에서도 꽃은 핀다. 자세히 봐야 보이는 거야.",
    },
    "dear-hyeri": {
      genre: ["로맨스", "드라마", "심리"],
      synopsisKeywords: ["해리성 정체감 장애", "아나운서", "또 다른 자아"],
      famousQuote: "그녀는 다른 사람이 아니야. 내가 되지 못했던 나야.",
    },
    "black-knight": {
      genre: ["액션", "SF", "드라마"],
      synopsisKeywords: ["디스토피아", "택배 기사", "산소"],
      famousQuote: "난민도 사람이야. 그들도 숨 쉬고 살아. 그건 불공평해.",
    },
    "tempest": {
      genre: ["스릴러", "액션", "스파이"],
      synopsisKeywords: ["외교관", "비밀 요원", "정치적 음모"],
      famousQuote: "폭풍은 허락을 구하지 않아. 그냥 도착할 뿐이야.",
    },
    "through-the-darkness": {
      genre: ["범죄", "스릴러", "드라마"],
      synopsisKeywords: ["범죄 프로파일러", "연쇄살인범", "1990년대"],
      famousQuote: "괴물을 잡으려면 그것이 어떻게 생각하는지 이해해야 해 — 스스로 괴물이 되지 않으면서.",
    },
    "chicago-typewriter": {
      genre: ["로맨스", "판타지", "미스터리"],
      synopsisKeywords: ["환생", "1930년대 독립운동", "고스트라이터"],
      famousQuote: "나는 네 대필 작가야. 다만, 진짜 유령이지.",
    },
    "trauma-code-heroes-on-call": {
      genre: ["의학", "액션", "드라마"],
      synopsisKeywords: ["외상 센터", "엘리트 외과의", "응급"],
      famousQuote: "어디에서 시작했는지 절대 잊으면 안 돼.",
    },

    // ===== EXPANSION: 100 NEW DRAMAS =====

    // --- EASY (30) ---
    "the-interest-of-love": {
      genre: ["로맨스", "드라마"],
      synopsisKeywords: ["은행 직원", "짝사랑", "계급 차이"],
      famousQuote: "사랑은 이해하는 게 아니야. 이해할 수 없는 걸 받아들이는 거야.",
    },
    "love-to-hate-you": {
      genre: ["로맨스", "코미디"],
      synopsisKeywords: ["엔터 변호사", "배우", "남녀 대결"],
      famousQuote: "사랑하는 게 싫고, 미워하는 게 좋아.",
    },
    "behind-your-touch": {
      genre: ["코미디", "미스터리", "로맨스"],
      synopsisKeywords: ["접촉 초능력", "수의사", "형사"],
      famousQuote: "때로는 진실이 가장 예상치 못한 접촉 속에 숨어 있어.",
    },
    "the-fabulous": {
      genre: ["로맨스", "드라마"],
      synopsisKeywords: ["패션 업계", "프리랜서", "꿈"],
      famousQuote: "패션에서는 스스로를 재창조하거나 사라지거나 둘 중 하나야.",
    },
    "romance-is-a-bonus-book": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["출판사", "싱글맘", "비밀 동거"],
      famousQuote: "최고의 이야기는 당신의 인생을 바꾸는 이야기야.",
    },
    "tale-of-the-nine-tailed": {
      genre: ["판타지", "로맨스", "액션"],
      synopsisKeywords: ["구미호", "초자연", "환생"],
      famousQuote: "천 년을 기다려서 당신을 다시 찾았어.",
    },
    "suspicious-partner": {
      genre: ["로맨스", "코미디", "법정"],
      synopsisKeywords: ["검사", "살인 용의자", "기억상실"],
      famousQuote: "가장 의심스러운 건 내가 당신에게 이렇게 빠져든 거야.",
    },
    "touch-your-heart": {
      genre: ["로맨스", "코미디", "법정"],
      synopsisKeywords: ["여배우", "변호사", "사내 로맨스"],
      famousQuote: "건드릴 수 없다고 생각했던 내 마음을 당신이 건드렸어.",
    },
    "shooting-stars": {
      genre: ["로맨스", "코미디"],
      synopsisKeywords: ["PR 매니저", "톱스타", "연예 산업"],
      famousQuote: "모든 스타 뒤에는 그들이 계속 빛나게 해주는 사람이 있다.",
    },
    "black-dog": {
      genre: ["드라마", "인생"],
      synopsisKeywords: ["기간제 교사", "학교 정치", "교육"],
      famousQuote: "가르침은 답을 주는 게 아니야. 올바른 질문을 던지는 거야.",
    },
    "a-time-called-you": {
      genre: ["로맨스", "미스터리", "판타지"],
      synopsisKeywords: ["시간 여행", "카세트 테이프", "도플갱어"],
      famousQuote: "시간이 우리를 갈라놓지만, 사랑은 언제나 적절한 순간을 찾아.",
    },
    "forecasting-love-and-weather": {
      genre: ["로맨스", "드라마"],
      synopsisKeywords: ["기상 캐스터", "사내 연애", "기상학"],
      famousQuote: "사랑은 날씨 같아 — 예측 불가능하지만, 언제나 경험할 가치가 있어.",
    },
    "work-later-drink-now": {
      genre: ["코미디", "드라마"],
      synopsisKeywords: ["음주 문화", "여성 우정", "워라밸"],
      famousQuote: "인생은 짧으니까. 일단 마시고, 걱정은 나중에.",
    },
    "the-sound-of-magic": {
      genre: ["판타지", "드라마", "음악"],
      synopsisKeywords: ["마술사", "폐놀이공원", "성장"],
      famousQuote: "마법을 믿어? 그러면 이미 반은 온 거야.",
    },
    "fight-for-my-way": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["언더독", "태권도", "친구에서 연인"],
      famousQuote: "우리가 최고는 아니지만, 적어도 원하는 것을 위해 싸우고 있잖아.",
    },
    "doom-at-your-service": {
      genre: ["로맨스", "판타지", "드라마"],
      synopsisKeywords: ["멸망 신", "불치병", "소원"],
      famousQuote: "세상이 끝나길 바랐는데, 당신이 나타났어.",
    },
    "because-this-is-my-first-life": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["계약 결혼", "주거 위기", "고양이"],
      famousQuote: "이번 생은 처음이라 사는 법을 아무것도 모르겠어.",
    },
    "her-private-life": {
      genre: ["로맨스", "코미디"],
      synopsisKeywords: ["덕후", "미술관 큐레이터", "이중 생활"],
      famousQuote: "덕질은 취미가 아니야. 삶의 방식이야.",
    },
    "run-on": {
      genre: ["로맨스", "드라마"],
      synopsisKeywords: ["단거리 선수", "자막 번역가", "다른 세계"],
      famousQuote: "우리는 다른 속도로 달리지만, 어쩐지 항상 같은 결승선에서 만나.",
    },
    "backstreet-rookie": {
      genre: ["로맨스", "코미디"],
      synopsisKeywords: ["편의점", "알바", "나이 차"],
      famousQuote: "인생의 가장 좋은 것들은 가장 평범한 곳에서 찾을 수 있어.",
    },
    "the-midnight-romance-in-hagwon": {
      genre: ["로맨스", "드라마"],
      synopsisKeywords: ["학원", "제자와 선생", "밤늦게"],
      famousQuote: "어떤 꽃은 자정에만 핀다, 아무도 보지 않을 때.",
    },
    "squid-game-2": {
      genre: ["스릴러", "드라마", "서바이벌"],
      synopsisKeywords: ["복귀", "혁명", "새로운 게임"],
      famousQuote: "게임은 절대 끝나지 않아. 참가자만 바뀔 뿐이야.",
    },
    "light-shop": {
      genre: ["미스터리", "판타지", "드라마"],
      synopsisKeywords: ["조명 가게", "사후세계", "영혼"],
      famousQuote: "모든 빛은 한때 빛났던 누군가의 이야기를 담고 있다.",
    },
    "no-gain-no-love": {
      genre: ["로맨스", "코미디"],
      synopsisKeywords: ["가짜 결혼", "계산적 사랑", "편의점"],
      famousQuote: "사랑은 계산하는 게 아닌데. 근데 여기 스프레드시트가 있네.",
    },
    "melo-is-my-nature": {
      genre: ["코미디", "로맨스", "드라마"],
      synopsisKeywords: ["세 친구", "30대 여성", "방송국"],
      famousQuote: "내 인생은 멜로드라마야, 그리고 그게 나는 좋아.",
    },
    "crash-course-in-romance": {
      genre: ["로맨스", "코미디", "미스터리"],
      synopsisKeywords: ["스타 강사", "싱글맘", "교육 열풍"],
      famousQuote: "내가 배운 최고의 수업은 교실에서가 아니었다.",
    },
    "love-alarm": {
      genre: ["로맨스", "드라마", "SF"],
      synopsisKeywords: ["연애 앱", "알림", "삼각관계"],
      famousQuote: "앱이 누가 널 사랑하는지 알려줄 수 있다면, 알고 싶어?",
    },
    "eighteen-again": {
      genre: ["로맨스", "코미디", "판타지"],
      synopsisKeywords: ["나이 역행", "이혼", "두 번째 기회"],
      famousQuote: "다시 18살이 될 수 있다면, 다시 당신을 선택할 거야.",
    },
    "extraordinary-you": {
      genre: ["로맨스", "판타지", "코미디"],
      synopsisKeywords: ["만화 속 세계", "엑스트라 캐릭터", "운명"],
      famousQuote: "이 이야기에서 엑스트라일 뿐이라도, 내 감정은 진짜야.",
    },
    "angel-last-mission-love": {
      genre: ["로맨스", "판타지", "드라마"],
      synopsisKeywords: ["천사", "발레리나", "마지막 임무"],
      famousQuote: "나의 마지막 임무는 당신이 다시 사랑하게 만드는 것이었어.",
    },

    // --- MEDIUM (40) ---
    "the-smile-has-left-your-eyes": {
      genre: ["로맨스", "스릴러", "미스터리"],
      synopsisKeywords: ["미스터리한 남자", "형사 오빠", "어두운 과거"],
      famousQuote: "당신이 웃을 때, 어둠도 견딜 만했어.",
    },
    "the-red-sleeve": {
      genre: ["로맨스", "사극", "드라마"],
      synopsisKeywords: ["궁녀", "왕", "자유 vs 사랑"],
      famousQuote: "왕에게 사랑받고 싶지 않아요. 한 사람으로서 사랑받고 싶어요.",
    },
    "big-mouth": {
      genre: ["스릴러", "범죄", "드라마"],
      synopsisKeywords: ["변호사", "교도소", "빅마우스"],
      famousQuote: "큰 입도 사용법을 알면 무기가 될 수 있어.",
    },
    "mouse": {
      genre: ["스릴러", "범죄", "미스터리"],
      synopsisKeywords: ["사이코패스 유전자", "경찰관", "연쇄살인범"],
      famousQuote: "괴물은 태어나는 건가, 만들어지는 건가? 그 질문이 나를 괴롭혀.",
    },
    "thirty-nine": {
      genre: ["드라마", "로맨스", "인생"],
      synopsisKeywords: ["우정", "마흔이 되는 나이", "불치병"],
      famousQuote: "서른아홉에 깨달았어, 친구들과의 시간이 진짜 보물이라는 걸.",
    },
    "tomorrow": {
      genre: ["판타지", "드라마"],
      synopsisKeywords: ["저승사자", "자살 예방", "저승팀"],
      famousQuote: "모든 생명은 구할 가치가 있어, 본인이 믿지 않더라도.",
    },
    "one-spring-night": {
      genre: ["로맨스", "드라마"],
      synopsisKeywords: ["사서", "약사", "싱글 아빠"],
      famousQuote: "사랑은 규칙을 따르지 않아. 가장 예상치 못한 봄밤에 찾아와.",
    },
    "something-in-the-rain": {
      genre: ["로맨스", "드라마"],
      synopsisKeywords: ["연상 여자", "연하 남자", "친구 동생"],
      famousQuote: "마음 앞에서 나이는 숫자일 뿐이야.",
    },
    "the-kings-affection": {
      genre: ["로맨스", "사극", "드라마"],
      synopsisKeywords: ["쌍둥이", "세자 행세", "금지된 사랑"],
      famousQuote: "네가 살 수 있도록 왕이 되었어. 이제 살아줘, 내가 사랑할 수 있게.",
    },
    "snow-drop": {
      genre: ["로맨스", "스릴러", "사극"],
      synopsisKeywords: ["1987 민주화", "간첩", "기숙사"],
      famousQuote: "거짓의 세상에서, 당신을 사랑한 것만이 유일한 진실이었어.",
    },
    "cheese-in-the-trap": {
      genre: ["로맨스", "드라마", "미스터리"],
      synopsisKeywords: ["대학교", "미스터리한 선배", "조종"],
      famousQuote: "세상에 보여주는 미소가 항상 마음속 미소와 같지는 않아.",
    },
    "dream-high": {
      genre: ["로맨스", "코미디", "음악"],
      synopsisKeywords: ["예술 학교", "K-팝 꿈", "라이벌"],
      famousQuote: "세상이 작게 꿈꾸라고 해도, 높이 꿈꿔.",
    },
    "reply-1997": {
      genre: ["코미디", "로맨스", "드라마"],
      synopsisKeywords: ["팬걸", "H.O.T.", "부산"],
      famousQuote: "첫사랑은 절대 완전히 죽지 않아. 형태만 바뀔 뿐이야.",
    },
    "river-where-the-moon-rises": {
      genre: ["로맨스", "사극", "액션"],
      synopsisKeywords: ["고구려", "공주 전사", "정치적 음모"],
      famousQuote: "강은 흐르고, 달은 뜨지만 — 내 사랑은 변하지 않아.",
    },
    "doctor-cha": {
      genre: ["코미디", "드라마", "의학"],
      synopsisKeywords: ["주부 의사", "의대 복귀", "결혼 위기"],
      famousQuote: "되어야 할 사람이 되는 데 늦은 때란 없어.",
    },
    "mr-queen": {
      genre: ["코미디", "로맨스", "사극"],
      synopsisKeywords: ["영혼 교환", "조선 왕비", "현대 셰프"],
      famousQuote: "나는 조선 시대 왕비 몸에 갇힌 남자야. 뭐가 잘못될 수 있겠어?",
    },
    "law-school": {
      genre: ["법정", "미스터리", "드라마"],
      synopsisKeywords: ["로스쿨", "살인 사건", "교수"],
      famousQuote: "법은 진실을 보호하기 위해 존재해, 진실을 구부리기 위해서가 아니야.",
    },
    "at-a-distance-spring-is-green": {
      genre: ["로맨스", "드라마", "인생"],
      synopsisKeywords: ["대학 생활", "외로움", "겉모습 vs 현실"],
      famousQuote: "멀리서 보면 다 푸르러 보여. 가까이 보면 모두가 힘들어하고 있어.",
    },
    "100-days-my-prince": {
      genre: ["로맨스", "코미디", "사극"],
      synopsisKeywords: ["기억상실 왕자", "평민 아내", "100일"],
      famousQuote: "100일 만에 당신은 내가 살고 싶은 이유가 되었어.",
    },
    "rookie-cops": {
      genre: ["로맨스", "코미디", "범죄"],
      synopsisKeywords: ["경찰학교", "첫사랑", "정의"],
      famousQuote: "사람들을 지키려고 경찰이 되었는데, 우리를 지켜주는 사람은 누구야?",
    },
    "hi-bye-mama": {
      genre: ["판타지", "드라마", "로맨스"],
      synopsisKeywords: ["유령 엄마", "49일", "부활"],
      famousQuote: "죽음도 엄마의 사랑은 막을 수 없었어.",
    },
    "the-good-bad-mother": {
      genre: ["코미디", "드라마", "가족"],
      synopsisKeywords: ["호랑이 엄마", "기억상실", "시골 복귀"],
      famousQuote: "나쁜 엄마는 너무 치열하게 사랑하는 좋은 엄마일 뿐이야.",
    },
    "abyss": {
      genre: ["로맨스", "판타지", "미스터리"],
      synopsisKeywords: ["부활 구슬", "새 외모", "살인 사건"],
      famousQuote: "죽었다가 다시 살아나니 아름다움은 겉껍데기일 뿐이라는 걸 깨달았어.",
    },
    "kill-me-heal-me": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["다중 인격", "재벌 후계자", "정신과 의사"],
      famousQuote: "나는 일곱 명이지만, 전부 당신을 사랑해.",
    },
    "my-id-is-gangnam-beauty": {
      genre: ["로맨스", "코미디", "드라마"],
      synopsisKeywords: ["성형수술", "대학 생활", "자기 수용"],
      famousQuote: "아름다움은 사라지지만, 맞추려 했던 상처는 영원히 남아.",
    },
    "oh-my-ghost": {
      genre: ["로맨스", "코미디", "판타지"],
      synopsisKeywords: ["귀신 빙의", "소심한 셰프", "처녀 귀신"],
      famousQuote: "사랑에 빠진 건 귀신이 아니라 나였어, 처음부터.",
    },
    "lovers-of-the-red-sky": {
      genre: ["로맨스", "사극", "판타지"],
      synopsisKeywords: ["맹인 화가", "봉인된 마왕 왕자", "조선 미술"],
      famousQuote: "눈이 보이지 않아도, 붉은 하늘 아래 내 마음은 오직 당신만 봐.",
    },
    "pinocchio": {
      genre: ["로맨스", "드라마", "코미디"],
      synopsisKeywords: ["저널리즘", "거짓말하면 딸꾹질", "언론의 진실"],
      famousQuote: "거짓 없는 세상은 이상적이지만, 진실이 얼마나 고통스러운지 깨닫게 돼.",
    },
    "i-hear-your-voice": {
      genre: ["로맨스", "법정", "판타지"],
      synopsisKeywords: ["독심술", "국선 변호사", "증인 보호"],
      famousQuote: "너의 목소리가 들려, 하지만 네 마음은 더 크게 말해.",
    },
    "you-are-my-spring": {
      genre: ["로맨스", "미스터리", "드라마"],
      synopsisKeywords: ["정신과 의사", "호텔", "어린 시절 트라우마"],
      famousQuote: "끝없는 겨울 속에서 당신이 나의 봄이 되었어.",
    },
    "school-2017": {
      genre: ["로맨스", "드라마", "학교"],
      synopsisKeywords: ["고등학교", "익명 히어로", "계급 불평등"],
      famousQuote: "학교는 과목을 가르치지만, 인생은 교훈을 가르쳐.",
    },
    "cleaning-up": {
      genre: ["스릴러", "범죄", "드라마"],
      synopsisKeywords: ["청소 아줌마", "내부자 거래", "주식 시장"],
      famousQuote: "남들 뒤치다꺼리를 하니까 더러운 비밀이 어디 숨겨져 있는지 알아.",
    },
    "connect": {
      genre: ["스릴러", "공포", "드라마"],
      synopsisKeywords: ["장기 적출", "공유 시각", "연쇄살인범"],
      famousQuote: "우리는 통제할 수 없는 무언가로 연결되어 있어 — 그것이 두렵더라도.",
    },
    "mine": {
      genre: ["드라마", "미스터리", "스릴러"],
      synopsisKeywords: ["재벌 며느리", "살인 미스터리", "여성 연대"],
      famousQuote: "내 것은 내 거야. 어떤 대가를 치르더라도 지킬 거야.",
    },
    "my-holo-love": {
      genre: ["로맨스", "SF", "드라마"],
      synopsisKeywords: ["AI 홀로그램", "안면 인식 장애", "개발자"],
      famousQuote: "진짜가 아닌 사람을 사랑할 수 있어? 아니면 사랑 자체가 그를 진짜로 만드는 걸까?",
    },
    "racket-boys": {
      genre: ["코미디", "드라마", "스포츠"],
      synopsisKeywords: ["배드민턴", "시골 학교", "청춘"],
      famousQuote: "큰 코트가 없어도 큰 꿈을 꿀 수 있어.",
    },
    "dali-and-the-cocky-prince": {
      genre: ["로맨스", "코미디"],
      synopsisKeywords: ["미술관", "감자탕 식당", "정반대 매력"],
      famousQuote: "예술과 감자탕은 공통점이 없지만, 그래도 우린 완벽해 — 함께.",
    },
    "song-of-the-bandits": {
      genre: ["액션", "사극", "드라마"],
      synopsisKeywords: ["만주", "일제 강점기", "도적"],
      famousQuote: "우리가 도적이 된 건 선택이 아니야. 정의가 다른 길을 남겨주지 않았으니까.",
    },
    "bad-and-crazy": {
      genre: ["액션", "코미디", "범죄"],
      synopsisKeywords: ["부패 경찰", "또 다른 자아", "정의"],
      famousQuote: "때로는 진짜 나쁜 놈과 싸우려면 약간의 미친 짓이 필요해.",
    },
    "strangers-from-hell": {
      genre: ["스릴러", "공포", "미스터리"],
      synopsisKeywords: ["고시원", "섬뜩한 주민들", "고립"],
      famousQuote: "지옥은 장소가 아니야. 옆집에 사는 사람들이야.",
    },

    // --- HARD (30) ---
    "life-on-mars": {
      genre: ["범죄", "판타지", "드라마"],
      synopsisKeywords: ["1988 시간 여행", "형사", "혼수상태"],
      famousQuote: "꿈을 꾸고 있는 건가, 아니면 1988이 현재보다 더 현실인 건가?",
    },
    "the-guest": {
      genre: ["공포", "스릴러", "미스터리"],
      synopsisKeywords: ["퇴마", "무당", "빙의된 형사"],
      famousQuote: "악은 노크하지 않아. 이미 안에 들어와서 기다리고 있어.",
    },
    "white-christmas": {
      genre: ["스릴러", "미스터리", "드라마"],
      synopsisKeywords: ["고립된 학교", "익명 편지", "인간 본성"],
      famousQuote: "괴물은 태어나는 건가, 만들어지는 건가? 그 질문이 겨울 내내 우리를 괴롭혔어.",
    },
    "chuno": {
      genre: ["사극", "액션", "드라마"],
      synopsisKeywords: ["추노꾼", "조선", "도망 노비"],
      famousQuote: "자유는 주어지는 게 아니야. 피 묻은 손으로 쟁취해야 해.",
    },
    "the-smile-on-my-face": {
      genre: ["드라마", "범죄", "사극"],
      synopsisKeywords: ["광주 항쟁", "검사", "조폭"],
      famousQuote: "역사는 모래처럼 흐른다 — 멈출 수 없고 우리의 고통에 무관심하게.",
    },
    "damo": {
      genre: ["사극", "액션", "로맨스"],
      synopsisKeywords: ["여형사", "위조 화폐", "조선"],
      famousQuote: "남자들이 지배하는 세상에서, 그녀는 검을 뽑아 자기만의 운명을 썼다.",
    },
    "cruel-city": {
      genre: ["범죄", "스릴러", "드라마"],
      synopsisKeywords: ["잠입", "마약왕", "이중 스파이"],
      famousQuote: "이 무정한 도시에서 신뢰가 가장 비싼 화폐야.",
    },
    "bad-guys": {
      genre: ["액션", "범죄", "스릴러"],
      synopsisKeywords: ["범죄자 팀", "형사", "자경단"],
      famousQuote: "최악을 잡으려면 가장 나쁜 녀석들이 네 편에 있어야 해.",
    },
    "the-fiery-priest": {
      genre: ["액션", "코미디", "범죄"],
      synopsisKeywords: ["열혈 신부", "부패", "정의를 위한 싸움"],
      famousQuote: "하느님은 용서하시지만, 나는 안 해.",
    },
    "solomon-perjury": {
      genre: ["미스터리", "드라마", "법정"],
      synopsisKeywords: ["학생 재판", "학교 죽음", "진실 탐구"],
      famousQuote: "어른들이 덮었으니까, 아이들이 직접 재판을 열었다.",
    },
    "secret-forest-2": {
      genre: ["범죄", "스릴러", "드라마"],
      synopsisKeywords: ["검경 대립", "조직 부패", "권력 투쟁"],
      famousQuote: "숲을 깊이 파면 팔수록, 더 많은 비밀이 드러난다.",
    },
    "return": {
      genre: ["스릴러", "미스터리", "법정"],
      synopsisKeywords: ["사교계 살인", "변호사", "상류층 범죄"],
      famousQuote: "부자는 감옥에 가지 않아. 진실을 사라지게 만드는 변호사를 고용하지.",
    },
    "god-of-war": {
      genre: ["스릴러", "미스터리", "판타지"],
      synopsisKeywords: ["14일 타임루프", "딸의 살해", "시간과의 경주"],
      famousQuote: "신이 14일을 줬어. 매 초를 그녀를 구하는 데 쓸 거야.",
    },
    "remembered": {
      genre: ["법정", "드라마", "스릴러"],
      synopsisKeywords: ["완전 기억 능력", "억울한 유죄", "알츠하이머"],
      famousQuote: "나는 전부 기억해 — 모든 세부사항, 모든 불의를. 그리고 그들에게 대가를 치르게 할 거야.",
    },
    "just-between-lovers": {
      genre: ["로맨스", "드라마"],
      synopsisKeywords: ["건물 붕괴 생존자", "트라우마", "치유의 사랑"],
      famousQuote: "우리는 붕괴에서 살아남았어. 이제는 살아가는 것에서 살아남아야 해.",
    },
    "designated-survivor-60-days": {
      genre: ["스릴러", "정치", "드라마"],
      synopsisKeywords: ["권한 대행 대통령", "폭탄 테러", "60일"],
      famousQuote: "권력을 원한 적 없어. 하지만 이제 갖게 됐으니, 국민을 위해 쓸 거야.",
    },
    "365-repeat-the-year": {
      genre: ["스릴러", "미스터리", "SF"],
      synopsisKeywords: ["시간 리셋", "10명의 참가자", "운명 바꾸기"],
      famousQuote: "운명을 바꾸려고 1년을 되돌렸지만, 운명은 다른 계획이 있었어.",
    },
    "the-devil-judge": {
      genre: ["스릴러", "법정", "드라마"],
      synopsisKeywords: ["리얼리티 법정 쇼", "디스토피아 한국", "카리스마 판사"],
      famousQuote: "정의는 쇼야, 그리고 내가 그걸 연출하고 있어.",
    },
    "tunnel": {
      genre: ["범죄", "스릴러", "판타지"],
      synopsisKeywords: ["1986 형사", "시간 터널", "연쇄살인범"],
      famousQuote: "터널을 통해 30년을 건넜지만, 살인마는 양쪽에서 기다리고 있었어.",
    },
    "the-nokdu-flower": {
      genre: ["사극", "드라마", "액션"],
      synopsisKeywords: ["동학 농민 혁명", "형제", "1894"],
      famousQuote: "혁명의 꽃은 백성이 더 이상 견딜 수 없을 때 핀다.",
    },
    "arthdal-chronicles": {
      genre: ["판타지", "사극", "드라마"],
      synopsisKeywords: ["고대 문명", "부족 전쟁", "신화"],
      famousQuote: "아스달에서 권력은 물려받는 게 아니야. 빼앗는 거야.",
    },
    "the-cursed": {
      genre: ["공포", "스릴러", "미스터리"],
      synopsisKeywords: ["무당 저주", "IT 회사", "초자연 복수"],
      famousQuote: "기술은 발전하지만, 저주는 예나 지금이나 치명적이야.",
    },
    "iris": {
      genre: ["액션", "스릴러", "로맨스"],
      synopsisKeywords: ["비밀 요원", "남북 긴장", "배신"],
      famousQuote: "첩보의 세계에서, 사랑이 가장 위험한 무기야.",
    },
    "bridal-mask": {
      genre: ["액션", "사극", "드라마"],
      synopsisKeywords: ["일제 강점기", "가면 영웅", "독립 투사"],
      famousQuote: "가면 뒤에 나는 죽기를 거부하는 민족의 분노다.",
    },
    "good-manager": {
      genre: ["코미디", "드라마", "비즈니스"],
      synopsisKeywords: ["회계사", "기업 부패", "내부 고발자"],
      famousQuote: "숫자는 거짓말하지 않아. 하지만 그 뒤의 사람들은 확실히 해.",
    },
    "beautiful-world": {
      genre: ["드라마", "미스터리"],
      synopsisKeywords: ["학교 폭력", "혼수상태 학생", "부모의 조사"],
      famousQuote: "아이들이 서로를 다치게 할 때도 여전히 아름다운 세상일까?",
    },
    "doctor-john": {
      genre: ["의학", "로맨스", "드라마"],
      synopsisKeywords: ["통증 전문의", "마취학", "안락사"],
      famousQuote: "통증은 몸의 도움 요청이야. 내 일은 그 부름에 응답하는 거야.",
    },
    "extracurricular": {
      genre: ["범죄", "스릴러", "드라마"],
      synopsisKeywords: ["고등학교 범죄", "매춘 조직", "어두운 비밀"],
      famousQuote: "우리는 범죄를 학교의 또 다른 과목처럼 공부했어.",
    },
    "money-flower": {
      genre: ["드라마", "스릴러", "로맨스"],
      synopsisKeywords: ["사생아", "재벌 복수", "장기 계획"],
      famousQuote: "돈은 꽃처럼 피지만, 그 뿌리는 항상 어둠 속에 묻혀 있어.",
    },
    "secret-love-affair": {
      genre: ["로맨스", "드라마", "음악"],
      synopsisKeywords: ["피아노 천재", "연상 여자", "예술 재단 스캔들"],
      famousQuote: "음악이 우리를 만나게 했어. 사회가 우리를 갈라놓으려 했고.",
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

    // ===== ADDITIONAL — International Fan Favorites (25) =====

    // --- EASY (7) ---
    "hellbound": {
      genre: ["Thriller", "Terror", "Sobrenatural"],
      synopsisKeywords: ["decreto divino", "demonios", "secta"],
      famousQuote: "No se nada de dioses, ni me importa. Este mundo pertenece a las personas.",
    },
    "the-world-of-the-married": {
      genre: ["Drama", "Romance", "Thriller"],
      synopsisKeywords: ["aventura", "venganza", "traicion"],
      famousQuote: "Lo que mas confiaba en este mundo eras tu. Y tu lo destruiste todo.",
    },
    "reborn-rich": {
      genre: ["Drama", "Fantasia", "Venganza"],
      synopsisKeywords: ["chaebol", "reencarnacion", "venganza"],
      famousQuote: "El dinero no se trata de tenerlo. Se trata de controlar a quienes lo necesitan.",
    },
    "when-life-gives-you-tangerines": {
      genre: ["Romance", "Drama", "Historico"],
      synopsisKeywords: ["Isla de Jeju", "anos 60", "amor de toda la vida"],
      famousQuote: "La primavera para ellos no era una estacion para sonar, sino para renunciar a los suenos.",
    },
    "whats-wrong-with-secretary-kim": {
      genre: ["Romance", "Comedia"],
      synopsisKeywords: ["jefe narcisista", "secretaria", "renuncia"],
      famousQuote: "Cada momento mio fuiste tu — cuando ame, y tambien cuando me lastimaron.",
    },
    "gyeongseong-creature": {
      genre: ["Terror", "Misterio", "Historico"],
      synopsisKeywords: ["Gyeongseong 1945", "ocupacion japonesa", "criatura"],
      famousQuote: "Para sobrevivir, tienes que convertirte en un monstruo tu mismo.",
    },
    "doona": {
      genre: ["Romance", "Drama"],
      synopsisKeywords: ["ex-idol", "estudiante universitario", "pension"],
      famousQuote: "Deje de ser idol. Pero nunca deje de ser yo misma.",
    },

    // --- MEDIUM (11) ---
    "weak-hero-class-1": {
      genre: ["Accion", "Drama", "Escolar"],
      synopsisKeywords: ["violencia escolar", "luchador inteligente", "amistad"],
      famousQuote: "No cruces la linea. Te lo adverti.",
    },
    "bloodhounds": {
      genre: ["Accion", "Thriller", "Crimen"],
      synopsisKeywords: ["boxeo", "prestamistas", "vigilante"],
      famousQuote: "Si te aprovechas de los debiles por dinero, eres un matón. Nosotros somos boxeadores.",
    },
    "a-killer-paradox": {
      genre: ["Crimen", "Thriller", "Comedia negra"],
      synopsisKeywords: ["asesinato accidental", "asesino en serie", "detective"],
      famousQuote: "?Matar a un asesino sigue siendo un crimen? La respuesta depende de quien pregunte.",
    },
    "happiness": {
      genre: ["Thriller", "Accion", "Terror"],
      synopsisKeywords: ["confinamiento en apartamento", "infeccion", "supervivencia"],
      famousQuote: "Solo porque ayer estuvo bien no significa que hoy vaya a estarlo.",
    },
    "love-in-the-moonlight": {
      genre: ["Romance", "Historico", "Comedia"],
      synopsisKeywords: ["principe heredero", "disfraz de eunuco", "romance de Joseon"],
      famousQuote: "Aunque pudiera retroceder en el tiempo, encontraria el camino de vuelta a ti.",
    },
    "my-dearest": {
      genre: ["Romance", "Historico", "Drama"],
      synopsisKeywords: ["invasion Qing", "Joseon", "amor prohibido"],
      famousQuote: "Incluso en la guerra, incluso en la muerte, mi corazon solo te conocera a ti.",
    },
    "the-uncanny-counter": {
      genre: ["Sobrenatural", "Accion", "Drama"],
      synopsisKeywords: ["espiritus malignos", "tienda de fideos", "contadores"],
      famousQuote: "Cazamos espiritus malignos. Pero nuestra verdadera arma es el vinculo entre nosotros.",
    },
    "the-judge-from-hell": {
      genre: ["Sobrenatural", "Crimen", "Romance"],
      synopsisKeywords: ["jueza demonio", "castigo", "redencion"],
      famousQuote: "Vine del infierno para juzgar a los vivos. Pero los vivos me ensenaron algo sobre la misericordia.",
    },
    "family-by-choice": {
      genre: ["Romance", "Comedia", "Familia"],
      synopsisKeywords: ["familia elegida", "reencuentro", "vinculo de infancia"],
      famousQuote: "La familia no es cuestion de sangre. Es quien se queda cuando todos los demas se van.",
    },
    "the-atypical-family": {
      genre: ["Fantasia", "Romance", "Drama"],
      synopsisKeywords: ["superpoderes", "depresion", "disfuncion familiar"],
      famousQuote: "No somos heroes. Pero el uno para el otro, podemos intentar serlo.",
    },
    "bon-appetit-your-majesty": {
      genre: ["Romance", "Fantasia", "Historico"],
      synopsisKeywords: ["viaje en el tiempo", "chef de Joseon", "rey tirano"],
      famousQuote: "El camino al corazon de un tirano es a traves de su estomago.",
    },

    // --- HARD (7) ---
    "like-flowers-in-sand": {
      genre: ["Comedia", "Misterio", "Romance"],
      synopsisKeywords: ["ssireum", "pueblo pequeno", "reencuentro de infancia"],
      famousQuote: "Incluso en la arena florecen flores. Solo tienes que mirar de cerca.",
    },
    "dear-hyeri": {
      genre: ["Romance", "Drama", "Psicologico"],
      synopsisKeywords: ["identidad disociativa", "presentadora", "yo alternativo"],
      famousQuote: "Ella no es otra persona. Es la yo que no pude llegar a ser.",
    },
    "black-knight": {
      genre: ["Accion", "Ciencia ficcion", "Drama"],
      synopsisKeywords: ["distopia", "caballero repartidor", "oxigeno"],
      famousQuote: "Los refugiados tambien son personas. Respiran y viven. Eso es injusto.",
    },
    "tempest": {
      genre: ["Thriller", "Accion", "Espionaje"],
      synopsisKeywords: ["diplomatica", "agente secreto", "conspiracion politica"],
      famousQuote: "La tormenta no pide permiso. Simplemente llega.",
    },
    "through-the-darkness": {
      genre: ["Crimen", "Thriller", "Drama"],
      synopsisKeywords: ["perfilador criminal", "asesino en serie", "anos 90"],
      famousQuote: "Para atrapar a un monstruo, debes entender como piensa — sin convertirte en uno.",
    },
    "chicago-typewriter": {
      genre: ["Romance", "Fantasia", "Misterio"],
      synopsisKeywords: ["reencarnacion", "resistencia de los anos 30", "escritor fantasma"],
      famousQuote: "Soy tu escritor fantasma. Excepto que en realidad soy un fantasma.",
    },
    "trauma-code-heroes-on-call": {
      genre: ["Medico", "Accion", "Drama"],
      synopsisKeywords: ["centro de trauma", "cirujano de elite", "emergencia"],
      famousQuote: "Nunca debes olvidar donde empezaste.",
    },

    // ===== EXPANSION: 100 NEW DRAMAS =====

    // --- EASY (30) ---
    "the-interest-of-love": {
      genre: ["Romance", "Drama"],
      synopsisKeywords: ["empleados de banco", "amor no correspondido", "disparidad de clases"],
      famousQuote: "El amor no se trata de entender. Se trata de aceptar lo que no puedes entender.",
    },
    "love-to-hate-you": {
      genre: ["Romance", "Comedia"],
      synopsisKeywords: ["abogada de entretenimiento", "actor", "batalla de sexos"],
      famousQuote: "Odio amarte, y amo odiarte.",
    },
    "behind-your-touch": {
      genre: ["Comedia", "Misterio", "Romance"],
      synopsisKeywords: ["psicometria", "veterinaria", "detective"],
      famousQuote: "A veces la verdad se esconde en el toque mas inesperado.",
    },
    "the-fabulous": {
      genre: ["Romance", "Drama"],
      synopsisKeywords: ["industria de la moda", "freelancers", "suenos"],
      famousQuote: "En la moda, o te reinventas o desapareces.",
    },
    "romance-is-a-bonus-book": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["editorial", "madre soltera", "companera de piso secreta"],
      famousQuote: "Las mejores historias son las que cambian tu vida.",
    },
    "tale-of-the-nine-tailed": {
      genre: ["Fantasia", "Romance", "Accion"],
      synopsisKeywords: ["zorro de nueve colas", "sobrenatural", "reencarnacion"],
      famousQuote: "Espere mil anos para encontrarte de nuevo.",
    },
    "suspicious-partner": {
      genre: ["Romance", "Comedia", "Legal"],
      synopsisKeywords: ["fiscal", "sospechosa de asesinato", "amnesia"],
      famousQuote: "Lo mas sospechoso es cuanto me he enamorado de ti.",
    },
    "touch-your-heart": {
      genre: ["Romance", "Comedia", "Legal"],
      synopsisKeywords: ["actriz", "abogado", "romance de oficina"],
      famousQuote: "Tocaste mi corazon cuando pense que era intocable.",
    },
    "shooting-stars": {
      genre: ["Romance", "Comedia"],
      synopsisKeywords: ["gerente de relaciones publicas", "estrella", "industria del entretenimiento"],
      famousQuote: "Detras de cada estrella hay alguien asegurandose de que siga brillando.",
    },
    "black-dog": {
      genre: ["Drama", "Vida"],
      synopsisKeywords: ["profesora interina", "politica escolar", "educacion"],
      famousQuote: "Ensenar no es dar respuestas. Es hacer las preguntas correctas.",
    },
    "a-time-called-you": {
      genre: ["Romance", "Misterio", "Fantasia"],
      synopsisKeywords: ["viaje en el tiempo", "cinta de casete", "doppelganger"],
      famousQuote: "El tiempo nos separa, pero el amor siempre encuentra el momento adecuado.",
    },
    "forecasting-love-and-weather": {
      genre: ["Romance", "Drama"],
      synopsisKeywords: ["pronosticadores del tiempo", "romance de oficina", "meteorologia"],
      famousQuote: "El amor es como el clima — impredecible, pero siempre vale la pena experimentarlo.",
    },
    "work-later-drink-now": {
      genre: ["Comedia", "Drama"],
      synopsisKeywords: ["cultura del alcohol", "amistad femenina", "equilibrio trabajo-vida"],
      famousQuote: "La vida es corta. Bebe primero, preocupate despues.",
    },
    "the-sound-of-magic": {
      genre: ["Fantasia", "Drama", "Musical"],
      synopsisKeywords: ["mago", "parque de diversiones abandonado", "crecer"],
      famousQuote: "?Crees en la magia? Entonces ya estas a medio camino.",
    },
    "fight-for-my-way": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["perdedor", "taekwondo", "de amigos a amantes"],
      famousQuote: "Puede que no seamos los mejores, pero al menos luchamos por lo que queremos.",
    },
    "doom-at-your-service": {
      genre: ["Romance", "Fantasia", "Drama"],
      synopsisKeywords: ["deidad de la destruccion", "enfermedad terminal", "deseo"],
      famousQuote: "Desee que el mundo terminara, y entonces apareciste tu.",
    },
    "because-this-is-my-first-life": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["matrimonio por contrato", "crisis de vivienda", "gato"],
      famousQuote: "Como esta es mi primera vida, no se nada sobre como vivirla.",
    },
    "her-private-life": {
      genre: ["Romance", "Comedia"],
      synopsisKeywords: ["fangirl", "curadora de museo", "doble vida"],
      famousQuote: "Ser fangirl no es un hobby. Es un estilo de vida.",
    },
    "run-on": {
      genre: ["Romance", "Drama"],
      synopsisKeywords: ["velocista", "traductora de subtitulos", "mundos diferentes"],
      famousQuote: "Corremos a diferentes ritmos, pero de alguna manera siempre nos encontramos en la misma meta.",
    },
    "backstreet-rookie": {
      genre: ["Romance", "Comedia"],
      synopsisKeywords: ["tienda de conveniencia", "trabajo de medio tiempo", "diferencia de edad"],
      famousQuote: "Las mejores cosas de la vida se encuentran en los lugares mas comunes.",
    },
    "the-midnight-romance-in-hagwon": {
      genre: ["Romance", "Drama"],
      synopsisKeywords: ["academia", "alumno y profesora", "noche"],
      famousQuote: "Algunas flores solo florecen a medianoche, cuando nadie esta mirando.",
    },
    "squid-game-2": {
      genre: ["Thriller", "Drama", "Supervivencia"],
      synopsisKeywords: ["regreso", "revolucion", "nuevos juegos"],
      famousQuote: "El juego nunca termina. Solo cambia a los jugadores.",
    },
    "light-shop": {
      genre: ["Misterio", "Fantasia", "Drama"],
      synopsisKeywords: ["tienda de luces", "mas alla", "espiritus"],
      famousQuote: "Cada luz cuenta la historia de alguien que una vez brillo.",
    },
    "no-gain-no-love": {
      genre: ["Romance", "Comedia"],
      synopsisKeywords: ["matrimonio falso", "amor calculado", "tienda de conveniencia"],
      famousQuote: "El amor no deberia calcularse. Pero aqui estoy con una hoja de calculo.",
    },
    "melo-is-my-nature": {
      genre: ["Comedia", "Romance", "Drama"],
      synopsisKeywords: ["tres amigas", "mujeres de 30", "industria televisiva"],
      famousQuote: "Mi vida es un melodrama, y no la cambiaria por nada.",
    },
    "crash-course-in-romance": {
      genre: ["Romance", "Comedia", "Misterio"],
      synopsisKeywords: ["tutor estrella", "madre soltera", "fiebre educativa"],
      famousQuote: "La mejor leccion que aprendi no fue en un salon de clases.",
    },
    "love-alarm": {
      genre: ["Romance", "Drama", "Ciencia ficcion"],
      synopsisKeywords: ["app de amor", "notificacion", "triangulo"],
      famousQuote: "?Que pasaria si una app pudiera decirte quien te ama? ?Querrias saberlo?",
    },
    "eighteen-again": {
      genre: ["Romance", "Comedia", "Fantasia"],
      synopsisKeywords: ["regreso a la juventud", "divorcio", "segunda oportunidad"],
      famousQuote: "Si pudiera tener 18 otra vez, te elegiria de nuevo.",
    },
    "extraordinary-you": {
      genre: ["Romance", "Fantasia", "Comedia"],
      synopsisKeywords: ["mundo del comic", "personaje extra", "destino"],
      famousQuote: "Aunque solo sea una extra en esta historia, mis sentimientos son reales.",
    },
    "angel-last-mission-love": {
      genre: ["Romance", "Fantasia", "Drama"],
      synopsisKeywords: ["angel", "bailarina", "ultima mision"],
      famousQuote: "Mi ultima mision fue hacer que volvieras a amar.",
    },

    // --- MEDIUM (40) ---
    "the-smile-has-left-your-eyes": {
      genre: ["Romance", "Thriller", "Misterio"],
      synopsisKeywords: ["hombre misterioso", "hermano detective", "pasado oscuro"],
      famousQuote: "Cuando sonreias, incluso la oscuridad se hacia soportable.",
    },
    "the-red-sleeve": {
      genre: ["Romance", "Historico", "Drama"],
      synopsisKeywords: ["dama de la corte", "rey", "libertad vs amor"],
      famousQuote: "No deseo ser amada por un rey. Deseo ser amada como persona.",
    },
    "big-mouth": {
      genre: ["Thriller", "Crimen", "Drama"],
      synopsisKeywords: ["abogado", "prision", "boca grande"],
      famousQuote: "Una boca grande puede ser un arma — si sabes como usarla.",
    },
    "mouse": {
      genre: ["Thriller", "Crimen", "Misterio"],
      synopsisKeywords: ["gen psicopata", "policia", "asesino en serie"],
      famousQuote: "?Los monstruos nacen o se hacen? Esa pregunta me atormenta.",
    },
    "thirty-nine": {
      genre: ["Drama", "Romance", "Vida"],
      synopsisKeywords: ["amistad", "cumplir 40", "enfermedad terminal"],
      famousQuote: "A los treinta y nueve, finalmente aprendi que el tiempo con amigos es el verdadero tesoro.",
    },
    "tomorrow": {
      genre: ["Fantasia", "Drama"],
      synopsisKeywords: ["parca", "prevencion del suicidio", "equipo del mas alla"],
      famousQuote: "Toda vida vale la pena ser salvada, incluso si ellos no lo creen.",
    },
    "one-spring-night": {
      genre: ["Romance", "Drama"],
      synopsisKeywords: ["bibliotecaria", "farmaceutico", "padre soltero"],
      famousQuote: "El amor no sigue las reglas. Llega en una noche de primavera cuando menos lo esperas.",
    },
    "something-in-the-rain": {
      genre: ["Romance", "Drama"],
      synopsisKeywords: ["mujer mayor", "hombre menor", "hermano de amiga"],
      famousQuote: "La edad es solo un numero cuando se trata del corazon.",
    },
    "the-kings-affection": {
      genre: ["Romance", "Historico", "Drama"],
      synopsisKeywords: ["gemela", "disfraz de principe", "amor prohibido"],
      famousQuote: "Me converti en rey para que pudieras vivir. Ahora vive, para que pueda amarte.",
    },
    "snow-drop": {
      genre: ["Romance", "Thriller", "Historico"],
      synopsisKeywords: ["democratizacion de 1987", "espia", "dormitorio"],
      famousQuote: "En un mundo de mentiras, amarte fue la unica verdad que conoci.",
    },
    "cheese-in-the-trap": {
      genre: ["Romance", "Drama", "Misterio"],
      synopsisKeywords: ["universidad", "senior misterioso", "manipulacion"],
      famousQuote: "La sonrisa que muestras al mundo no siempre es la que llevas por dentro.",
    },
    "dream-high": {
      genre: ["Romance", "Comedia", "Musical"],
      synopsisKeywords: ["escuela de artes", "sueno de K-pop", "rivalidad"],
      famousQuote: "Suena en grande, incluso cuando el mundo te dice que suenes en pequeno.",
    },
    "reply-1997": {
      genre: ["Comedia", "Romance", "Drama"],
      synopsisKeywords: ["fangirl", "H.O.T.", "Busan"],
      famousQuote: "El primer amor nunca muere realmente. Solo cambia de forma.",
    },
    "river-where-the-moon-rises": {
      genre: ["Romance", "Historico", "Accion"],
      synopsisKeywords: ["Goguryeo", "princesa guerrera", "intriga politica"],
      famousQuote: "El rio fluye y la luna sale — pero mi amor permanece constante.",
    },
    "doctor-cha": {
      genre: ["Comedia", "Drama", "Medico"],
      synopsisKeywords: ["ama de casa doctora", "regreso a medicina", "crisis matrimonial"],
      famousQuote: "Nunca es demasiado tarde para convertirte en la persona que estabas destinada a ser.",
    },
    "mr-queen": {
      genre: ["Comedia", "Romance", "Historico"],
      synopsisKeywords: ["intercambio de cuerpos", "reina de Joseon", "chef moderno"],
      famousQuote: "Soy un hombre atrapado en el cuerpo de una reina en la era Joseon. ?Que podria salir mal?",
    },
    "law-school": {
      genre: ["Legal", "Misterio", "Drama"],
      synopsisKeywords: ["escuela de derecho", "caso de asesinato", "profesor"],
      famousQuote: "La ley existe para proteger la verdad, no para doblarla.",
    },
    "at-a-distance-spring-is-green": {
      genre: ["Romance", "Drama", "Vida"],
      synopsisKeywords: ["vida universitaria", "soledad", "apariencias vs realidad"],
      famousQuote: "Desde lejos, todo parece verde. De cerca, todos estan luchando.",
    },
    "100-days-my-prince": {
      genre: ["Romance", "Comedia", "Historico"],
      synopsisKeywords: ["principe con amnesia", "esposa plebeya", "100 dias"],
      famousQuote: "En 100 dias, te convertiste en la razon por la que quise vivir.",
    },
    "rookie-cops": {
      genre: ["Romance", "Comedia", "Crimen"],
      synopsisKeywords: ["academia de policia", "primer amor", "justicia"],
      famousQuote: "Nos hicimos policias para proteger a la gente, pero ?quien nos protege a nosotros?",
    },
    "hi-bye-mama": {
      genre: ["Fantasia", "Drama", "Romance"],
      synopsisKeywords: ["madre fantasma", "49 dias", "resurreccion"],
      famousQuote: "Ni siquiera la muerte pudo detener el amor de una madre.",
    },
    "the-good-bad-mother": {
      genre: ["Comedia", "Drama", "Familia"],
      synopsisKeywords: ["mama tigresa", "amnesia", "regreso al campo"],
      famousQuote: "Una mala madre es solo una buena madre que ama con demasiada intensidad.",
    },
    "abyss": {
      genre: ["Romance", "Fantasia", "Misterio"],
      synopsisKeywords: ["esfera de resurreccion", "nueva apariencia", "caso de asesinato"],
      famousQuote: "Morir y volver me enseno que la belleza es solo superficial.",
    },
    "kill-me-heal-me": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["personalidades multiples", "heredero chaebol", "psiquiatra"],
      famousQuote: "Somos siete, pero todos te amamos.",
    },
    "my-id-is-gangnam-beauty": {
      genre: ["Romance", "Comedia", "Drama"],
      synopsisKeywords: ["cirugia plastica", "vida universitaria", "autoaceptacion"],
      famousQuote: "La belleza se desvanece, pero las cicatrices de intentar encajar duran para siempre.",
    },
    "oh-my-ghost": {
      genre: ["Romance", "Comedia", "Fantasia"],
      synopsisKeywords: ["posesion fantasmal", "chef timida", "fantasma virgen"],
      famousQuote: "No fue el fantasma quien se enamoro. Fui yo desde el principio.",
    },
    "lovers-of-the-red-sky": {
      genre: ["Romance", "Historico", "Fantasia"],
      synopsisKeywords: ["pintora ciega", "principe con demonio sellado", "arte de Joseon"],
      famousQuote: "Incluso ciega, mi corazon solo te ve bajo el cielo rojo.",
    },
    "pinocchio": {
      genre: ["Romance", "Drama", "Comedia"],
      synopsisKeywords: ["periodismo", "hipo al mentir", "verdad mediatica"],
      famousQuote: "Un mundo sin mentiras suena ideal, hasta que te das cuenta de lo dolorosa que puede ser la verdad.",
    },
    "i-hear-your-voice": {
      genre: ["Romance", "Legal", "Fantasia"],
      synopsisKeywords: ["lectura de mentes", "defensora publica", "proteccion de testigos"],
      famousQuote: "Puedo escuchar tu voz, pero tu corazon habla aun mas fuerte.",
    },
    "you-are-my-spring": {
      genre: ["Romance", "Misterio", "Drama"],
      synopsisKeywords: ["psiquiatra", "hotel", "trauma infantil"],
      famousQuote: "Te convertiste en mi primavera en medio de un invierno interminable.",
    },
    "school-2017": {
      genre: ["Romance", "Drama", "Escolar"],
      synopsisKeywords: ["instituto", "heroe anonimo", "desigualdad de clases"],
      famousQuote: "La escuela te ensena materias, pero la vida te ensena lecciones.",
    },
    "cleaning-up": {
      genre: ["Thriller", "Crimen", "Drama"],
      synopsisKeywords: ["senoras de limpieza", "trafico de informacion privilegiada", "bolsa de valores"],
      famousQuote: "Limpiamos lo de todos, asi que sabemos donde esta escondida la suciedad.",
    },
    "connect": {
      genre: ["Thriller", "Terror", "Drama"],
      synopsisKeywords: ["robo de organos", "vision compartida", "asesino en serie"],
      famousQuote: "Estamos conectados por algo que esta fuera de nuestro control — aunque nos aterrorice.",
    },
    "mine": {
      genre: ["Drama", "Misterio", "Thriller"],
      synopsisKeywords: ["esposas de chaebol", "misterio de asesinato", "solidaridad femenina"],
      famousQuote: "Lo mio es mio. Y lo protegere a cualquier costo.",
    },
    "my-holo-love": {
      genre: ["Romance", "Ciencia ficcion", "Drama"],
      synopsisKeywords: ["holograma de IA", "prosopagnosia", "desarrollador"],
      famousQuote: "?Puedes amar a alguien que no es real? ?O el amor mismo los hace reales?",
    },
    "racket-boys": {
      genre: ["Comedia", "Drama", "Deportes"],
      synopsisKeywords: ["badminton", "escuela rural", "juventud"],
      famousQuote: "No necesitas una cancha grande para tener grandes suenos.",
    },
    "dali-and-the-cocky-prince": {
      genre: ["Romance", "Comedia"],
      synopsisKeywords: ["galeria de arte", "restaurante de gamjatang", "opuestos se atraen"],
      famousQuote: "El arte y el gamjatang no tienen nada en comun, y sin embargo aqui estamos — perfectos juntos.",
    },
    "song-of-the-bandits": {
      genre: ["Accion", "Historico", "Drama"],
      synopsisKeywords: ["Manchuria", "ocupacion japonesa", "bandidos"],
      famousQuote: "Somos bandidos no por eleccion, sino porque la justicia no nos dejo otro camino.",
    },
    "bad-and-crazy": {
      genre: ["Accion", "Comedia", "Crimen"],
      synopsisKeywords: ["policia corrupto", "alter ego", "justicia"],
      famousQuote: "A veces necesitas un poco de locura para luchar contra lo verdaderamente malo.",
    },
    "strangers-from-hell": {
      genre: ["Thriller", "Terror", "Misterio"],
      synopsisKeywords: ["goshiwon", "residentes siniestros", "aislamiento"],
      famousQuote: "El infierno no es un lugar. Son las personas que viven al lado.",
    },

    // --- HARD (30) ---
    "life-on-mars": {
      genre: ["Crimen", "Fantasia", "Drama"],
      synopsisKeywords: ["viaje en el tiempo a 1988", "detective", "coma"],
      famousQuote: "?Estoy sonando, o 1988 es mas real de lo que el presente jamas fue?",
    },
    "the-guest": {
      genre: ["Terror", "Thriller", "Misterio"],
      synopsisKeywords: ["exorcismo", "chaman", "detective poseido"],
      famousQuote: "El mal no toca la puerta. Ya esta dentro, esperando.",
    },
    "white-christmas": {
      genre: ["Thriller", "Misterio", "Drama"],
      synopsisKeywords: ["escuela aislada", "cartas anonimas", "naturaleza humana"],
      famousQuote: "?Los monstruos nacen o se hacen? Esa pregunta nos atormento todo el invierno.",
    },
    "chuno": {
      genre: ["Historico", "Accion", "Drama"],
      synopsisKeywords: ["cazador de esclavos", "Joseon", "esclavos fugitivos"],
      famousQuote: "La libertad no se da. Debe tomarse con manos ensangrentadas.",
    },
    "the-smile-on-my-face": {
      genre: ["Drama", "Crimen", "Historico"],
      synopsisKeywords: ["Levantamiento de Gwangju", "fiscal", "gangster"],
      famousQuote: "La historia fluye como la arena — imparable e indiferente a nuestro dolor.",
    },
    "damo": {
      genre: ["Historico", "Accion", "Romance"],
      synopsisKeywords: ["detective femenina", "monedas falsas", "Joseon"],
      famousQuote: "En un mundo gobernado por hombres, ella desenvaino su espada y escribio su propio destino.",
    },
    "cruel-city": {
      genre: ["Crimen", "Thriller", "Drama"],
      synopsisKeywords: ["encubierto", "senor de las drogas", "doble agente"],
      famousQuote: "En esta ciudad cruel, la confianza es la moneda mas cara.",
    },
    "bad-guys": {
      genre: ["Accion", "Crimen", "Thriller"],
      synopsisKeywords: ["equipo de criminales", "detective", "justicia vigilante"],
      famousQuote: "Para atrapar a los peores, necesitas a los mas malos de tu lado.",
    },
    "the-fiery-priest": {
      genre: ["Accion", "Comedia", "Crimen"],
      synopsisKeywords: ["sacerdote furioso", "corrupcion", "lucha por la justicia"],
      famousQuote: "Dios perdona. Yo no.",
    },
    "solomon-perjury": {
      genre: ["Misterio", "Drama", "Legal"],
      synopsisKeywords: ["juicio estudiantil", "muerte escolar", "busqueda de la verdad"],
      famousQuote: "Los adultos lo encubrieron, asi que los ninos celebraron su propio juicio.",
    },
    "secret-forest-2": {
      genre: ["Crimen", "Thriller", "Drama"],
      synopsisKeywords: ["fiscalia vs policia", "corrupcion institucional", "lucha de poder"],
      famousQuote: "Cuanto mas excavas en el bosque, mas secretos descubres.",
    },
    "return": {
      genre: ["Thriller", "Misterio", "Legal"],
      synopsisKeywords: ["asesinato de socialite", "abogada", "crimenes de elite"],
      famousQuote: "Los ricos no van a prision. Contratan abogados que hacen desaparecer la verdad.",
    },
    "god-of-war": {
      genre: ["Thriller", "Misterio", "Fantasia"],
      synopsisKeywords: ["bucle de 14 dias", "asesinato de la hija", "carrera contra el tiempo"],
      famousQuote: "Dios me dio 14 dias. Usare cada segundo para salvarla.",
    },
    "remembered": {
      genre: ["Legal", "Drama", "Thriller"],
      synopsisKeywords: ["memoria eidetica", "condena injusta", "Alzheimer"],
      famousQuote: "Recuerdo todo — cada detalle, cada injusticia. Y les hare pagar.",
    },
    "just-between-lovers": {
      genre: ["Romance", "Drama"],
      synopsisKeywords: ["sobrevivientes de derrumbe", "trauma", "amor sanador"],
      famousQuote: "Sobrevivimos al derrumbe. Ahora tenemos que sobrevivir al vivir.",
    },
    "designated-survivor-60-days": {
      genre: ["Thriller", "Politico", "Drama"],
      synopsisKeywords: ["presidente interino", "atentado", "60 dias"],
      famousQuote: "Nunca quise el poder. Pero ahora que lo tengo, lo usare para la gente.",
    },
    "365-repeat-the-year": {
      genre: ["Thriller", "Misterio", "Ciencia ficcion"],
      synopsisKeywords: ["reinicio temporal", "10 participantes", "cambiar el destino"],
      famousQuote: "Retrocedimos un ano para cambiar nuestro destino, pero el destino tenia otros planes.",
    },
    "the-devil-judge": {
      genre: ["Thriller", "Legal", "Drama"],
      synopsisKeywords: ["reality show judicial", "Corea distopica", "juez carismatico"],
      famousQuote: "La justicia es un espectaculo, y yo soy quien lo dirige.",
    },
    "tunnel": {
      genre: ["Crimen", "Thriller", "Fantasia"],
      synopsisKeywords: ["detective de 1986", "tunel temporal", "asesino en serie"],
      famousQuote: "Cruce 30 anos a traves de un tunel, pero el asesino esperaba en ambos lados.",
    },
    "the-nokdu-flower": {
      genre: ["Historico", "Drama", "Accion"],
      synopsisKeywords: ["Revolucion Campesina Donghak", "hermanos", "1894"],
      famousQuote: "La flor de la revolucion florece cuando el pueblo ya no puede soportar mas.",
    },
    "arthdal-chronicles": {
      genre: ["Fantasia", "Historico", "Drama"],
      synopsisKeywords: ["civilizacion antigua", "guerra tribal", "mitologia"],
      famousQuote: "En Arthdal, el poder no se hereda. Se toma.",
    },
    "the-cursed": {
      genre: ["Terror", "Thriller", "Misterio"],
      synopsisKeywords: ["maldicion chamanica", "empresa de tecnologia", "venganza sobrenatural"],
      famousQuote: "La tecnologia avanza, pero las maldiciones siguen siendo tan antiguas y mortales como siempre.",
    },
    "iris": {
      genre: ["Accion", "Thriller", "Romance"],
      synopsisKeywords: ["agentes secretos", "tension Norte-Sur", "traicion"],
      famousQuote: "En el mundo del espionaje, el amor es el arma mas peligrosa.",
    },
    "bridal-mask": {
      genre: ["Accion", "Historico", "Drama"],
      synopsisKeywords: ["ocupacion japonesa", "heroe enmascarado", "luchador de la resistencia"],
      famousQuote: "Detras de la mascara, soy la furia de una nacion que se niega a morir.",
    },
    "good-manager": {
      genre: ["Comedia", "Drama", "Negocios"],
      synopsisKeywords: ["contador", "corrupcion corporativa", "denunciante"],
      famousQuote: "Los numeros no mienten. Pero las personas detras de ellos ciertamente si.",
    },
    "beautiful-world": {
      genre: ["Drama", "Misterio"],
      synopsisKeywords: ["violencia escolar", "estudiante en coma", "investigacion de padres"],
      famousQuote: "?Sigue siendo un mundo hermoso cuando los ninos se estan lastimando entre si?",
    },
    "doctor-john": {
      genre: ["Medico", "Romance", "Drama"],
      synopsisKeywords: ["especialista en dolor", "anestesiologia", "eutanasia"],
      famousQuote: "El dolor es el grito de ayuda del cuerpo. Mi trabajo es responder a ese llamado.",
    },
    "extracurricular": {
      genre: ["Crimen", "Thriller", "Drama"],
      synopsisKeywords: ["crimen estudiantil", "red de prostitucion", "secreto oscuro"],
      famousQuote: "Estudiamos el crimen como si fuera solo otra materia en la escuela.",
    },
    "money-flower": {
      genre: ["Drama", "Thriller", "Romance"],
      synopsisKeywords: ["hijo ilegitimo", "venganza contra chaebol", "plan a largo plazo"],
      famousQuote: "El dinero florece como una flor, pero sus raices siempre estan enterradas en la oscuridad.",
    },
    "secret-love-affair": {
      genre: ["Romance", "Drama", "Musical"],
      synopsisKeywords: ["prodigio del piano", "mujer mayor", "escandalo de fundacion artistica"],
      famousQuote: "La musica nos unio. La sociedad intento separarnos.",
    },
  },
};

export function getLocalizedDrama(id: string, locale: string): DramaLocalized | null {
  if (locale === "en") return null;
  return data[locale as Locale]?.[id] ?? null;
}
