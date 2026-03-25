import { Command } from '../types';

export const TERMINAL_COMMANDS: Command[] = [
  {
    name: 'ls',
    description: 'Tasavvur qiling, sizning xonangizda juda ko\'p o\'yinchoq qutilari bor. "ls" buyrug\'i - bu xonaga kirib, "Qani, bu yerda nimalar bor ekan?" deb atrofga qarash bilan barobar. Uni yozsangiz, kompyuter sizga shu papka ichidagi hamma narsani (fayllar va boshqa papkalarni) ko\'rsatadi. Bu xuddi qutining qopqog\'ini ochib ichiga qarashdek gap.',
    examples: ['ls', 'ls -l (hamma narsani batafsil, xuddi ro\'yxatdek ko\'rish)', 'ls -a (yashirin, berkitib qo\'yilgan narsalarni ham topish)'],
    category: 'terminal'
  },
  {
    name: 'cd',
    description: 'Bu buyruq - bu sizning "sehrli eshigingiz". Agar siz bir xonadan (papkadan) boshqasiga o\'tmoqchi bo\'lsangiz, "cd" dan foydalanasiz. Masalan, "cd O\'yinchoqlar" desangiz, siz o\'sha xonaga kirasiz. Agar orqaga, ya\'ni koridorga qaytmoqchi bo\'lsangiz, "cd .." deb yozasiz. Bu xuddi uyingizdagi xonalar orasida yurishga o\'xshaydi.',
    examples: ['cd papka_nomi (ichkariga kirish)', 'cd .. (bitta xona orqaga chiqish)', 'cd / (uyning eng boshiga, darvoza oldiga qaytish)'],
    category: 'terminal'
  },
  {
    name: 'pwd',
    description: 'Ba\'zida uyingiz juda katta bo\'lsa, qaysi xonada ekanligingizni unutib qo\'yishingiz mumkin. "pwd" buyrug\'i - bu sizga "Hoy, sen hozir oshxonadasan!" deb aytuvchi aqlli yordamchi. Uni yozsangiz, kompyuter siz turgan joyning to\'liq manzilini yozib beradi.',
    examples: ['pwd'],
    category: 'terminal'
  },
  {
    name: 'mkdir',
    description: 'Yangi bo\'sh quti (papka) yasashni xohlaysizmi? "mkdir" buyrug\'i xuddi sehrli tayoqchadek yangi papka yaratadi. Masalan, "mkdir rasmlarim" desangiz, kompyuter sizga rasmlaringizni solib qo\'yish uchun yangi bo\'sh joy tayyorlab beradi.',
    examples: ['mkdir yangi_papka_nomi'],
    category: 'terminal'
  },
  {
    name: 'touch',
    description: 'Bu buyruq - bu yangi toza qog\'oz olishga o\'xshaydi. Agar sizga biror narsa yozish uchun bo\'sh fayl kerak bo\'lsa, "touch" dan foydalanasiz. "touch kundalik.txt" desangiz, sizda yangi, hali hech narsa yozilmagan "kundalik" degan fayl paydo bo\'ladi.',
    examples: ['touch fayl_nomi.txt'],
    category: 'terminal'
  },
  {
    name: 'cat',
    description: 'Faylning ichida nima borligini bilmoqchimisiz? "cat" buyrug\'i - bu faylni ochib, ichidagi hamma yozuvlarni sizga baland ovozda o\'qib berishga o\'xshaydi. Uni yozsangiz, fayl ichidagi hamma gaplar terminalda ko\'rinadi.',
    examples: ['cat fayl_nomi'],
    category: 'terminal'
  },
  {
    name: 'mv',
    description: 'Bu buyruq ikki xil ish qiladi: yoki narsani bir xonadan boshqasiga ko\'chiradi, yoki uning nomini o\'zgartiradi. Masalan, "olma.txt" ni "anor.txt" qilib qayta nomlashingiz yoki uni boshqa papkaga surib qo\'yishingiz mumkin. Bu xuddi o\'yinchoqni bir joydan ikkinchi joyga olib qo\'yishdek gap.',
    examples: ['mv eski_nom yangi_nom (nomini o\'zgartirish)', 'mv fayl_nomi papka/ (ko\'chirish)'],
    category: 'terminal'
  },
  {
    name: 'cp',
    description: 'Nusxa ko\'chirish! Agar sizda bitta chiroyli rasm bo\'lsa va undan yana bitta kerak bo\'lsa, "cp" dan foydalanasiz. U asl narsaga tegmaydi, shunchaki uning aynan o\'zidek nusxasini yaratadi.',
    examples: ['cp asl_fayl nusxa_fayl'],
    category: 'terminal'
  },
  {
    name: 'rm',
    description: 'Ehtiyot bo\'ling! Bu - o\'chirish buyrug\'i. Agar biror narsani "rm" bilan o\'chirsangiz, u butunlay yo\'qoladi, uni qaytarib bo\'lmaydi. Bu xuddi keraksiz qog\'ozni yoqib yuborishga o\'xshaydi, u kulga aylanadi va qaytib kelmaydi.',
    examples: ['rm fayl_nomi', 'rm -rf papka_nomi (papkani ichidagi hamma narsasi bilan o\'chirish)'],
    category: 'terminal'
  },
  {
    name: 'gcc',
    description: 'Bu - "tarjimon". Siz C tilida yozgan kodingizni kompyuter tushunmaydi. "gcc" siz yozgan gaplarni kompyuter tushunadigan "0" va "1" larga o\'girib beradi. Shundan keyingina dasturingiz ishlaydi. Bu xuddi o\'zbekcha gapni inglizchaga tarjima qilishdek gap.',
    examples: ['gcc main.c (tarjima qilish)', 'gcc main.c -o dastur (tarjima qilib, unga "dastur" deb nom berish)'],
    category: 'terminal'
  },
  {
    name: 'chmod',
    description: 'Bu buyruq - bu faylga "ruxsatnoma" berish. Tasavvur qiling, sizda bir o\'yinchoq bor, lekin uni faqat siz o\'ynata olasiz. "chmod +x" desangiz, siz kompyuterga: "Bu faylni ishlatishga ruxsat beraman" degan bo\'lasiz. Busiz kompyuter dasturni ishga tushirishga qo\'rqadi.',
    examples: ['chmod +x fayl_nomi (ishlatishga ruxsat berish)', 'chmod 777 fayl_nomi (hamma narsaga ruxsat berish)'],
    category: 'terminal'
  },
  {
    name: 'nano',
    description: 'Bu - kompyuter ichidagi kichkina "bloknot". Agar siz biror fayl ichiga nimanidir yozmoqchi bo\'lsangiz (masalan, C kodi yoki shunchaki matn), "nano" ni ishlatasiz. U xuddi qog\'oz va qalam kabi ishlaydi.',
    examples: ['nano main.c (main.c faylini ochish yoki yaratish)', 'nano xat.txt (matnli fayl ochish)'],
    category: 'terminal'
  }
];

export const C_CONCEPTS: Command[] = [
  {
    name: 'O\'zgaruvchilar (Variables)',
    description: 'Kompyuterning xotirasida kichkina "idishchalar" bor deb tasavvur qiling. Har bir idishga har xil narsa solish mumkin. "int" idishiga faqat sonlar sig\'adi, "char" idishiga esa faqat bitta harf. Biz bu idishlarga nom beramiz, masalan "yosh" yoki "ism".',
    examples: ['int yosh = 10; (son saqlash)', 'char harf = \'S\'; (harf saqlash)', 'float vazn = 35.5; (nuqtali son saqlash)'],
    category: 'c'
  },
  {
    name: 'Shartlar (If/Else)',
    description: 'Bu - dasturning "miyasi". U o\'ylashni o\'rganadi. "Agar qornim och bo\'lsa - ovqat yeyman, bo\'lmasa - o\'ynayman". Dastur ham xuddi shunday: agar biror narsa to\'g\'ri bo\'lsa, u bitta ishni qiladi, noto\'g\'ri bo\'lsa boshqa ishni.',
    examples: ['if (son > 0) { ... } else { ... }'],
    category: 'c'
  },
  {
    name: 'Sikllar (Loops)',
    description: 'Tasavvur qiling, sizga "100 marta o\'tirib-turing" deyishdi. Siz buni sanab bajarasiz. Sikllar ham shunday: kompyuterga "shu ishni 10 marta bajar" deysiz va u charchamasdan qayta-qayta bajaradi. Bu zerikarli ishlarni tez bitirish uchun kerak.',
    examples: ['for (int i = 0; i < 10; i++) { ... }'],
    category: 'c'
  },
  {
    name: 'Kompilyatsiya va Ishga tushirish',
    description: 'Siz yozgan C kodi (main.c) - bu shunchaki matn. Uni kompyuter tushunishi uchun "gcc" yordamida "tarjima" (kompilyatsiya) qilish kerak. Natijada "a.out" yoki siz xohlagan nomdagi (masalan, "hello") dastur paydo bo\'ladi. Uni ishga tushirish uchun esa "./" dan foydalanamiz.',
    examples: ['gcc main.c (kompilyatsiya)', './a.out (ishga tushirish)', 'gcc main.c -o hello (nom berib kompilyatsiya)', './hello (nomli dasturni ishga tushirish)'],
    category: 'c'
  }
];

export const GIT_COMMANDS: Command[] = [
  {
    name: 'git clone',
    description: 'Internetdagi katta bir kutubxonadan kitobni nusxa ko\'chirib olishga o\'xshaydi. Boshqa birov yozgan yoki internetda turgan loyihani o\'z kompyuteringizga olib kelish uchun ishlatiladi.',
    examples: ['git clone https://manzil'],
    category: 'git'
  },
  {
    name: 'git checkout -b',
    description: 'Yangi "yo\'lakcha" (branch) ochish. Tasavvur qiling, siz katta bir rasm chizyapsiz, lekin bir joyini o\'zgartirib ko\'rmoqchisiz. Asl rasm buzilmasligi uchun, uning nusxasini boshqa xonada chizishni boshlaysiz. Bu yangi yo\'lakcha sizga xotirjam tajriba qilish imkonini beradi.',
    examples: ['git checkout -b develop (develop degan yangi yo\'lakcha ochish)'],
    category: 'git'
  },
  {
    name: 'git checkout',
    description: 'Ochilgan yo\'lakchalar orasida sakrab yurish. Bir xonadan ikkinchisiga o\'tish kabi. Masalan, "develop" xonasidan "main" (asosiy) xonaga qaytish uchun.',
    examples: ['git checkout main', 'git checkout develop'],
    category: 'git'
  },
  {
    name: 'git add',
    description: 'Bu - "savatga solish". Siz qilgan o\'zgarishlaringizni savatga solib, jo\'natishga tayyorlab qo\'yasiz. Hali jo\'natganingiz yo\'q, shunchaki "mana bularni yubormoqchiman" deb belgilab qo\'ydingiz.',
    examples: ['git add . (hamma narsani savatga solish)', 'git add fayl_nomi'],
    category: 'git'
  },
  {
    name: 'git commit',
    description: 'Savatdagi narsalarni qutiga solib, ustiga xat yozib muhrlash. "Men bugun mana bu xatoni tuzatdim" deb yozib qo\'yasiz. Bu loyiha tarixida muhrlanib qoladi.',
    examples: ['git commit -m "mening birinchi ishim"'],
    category: 'git'
  },
  {
    name: 'git push',
    description: 'Muhrlangan qutilarni internetdagi katta omborga (serverga) jo\'natish. Shundan keyin dunyoning narigi chekkasidagi do\'stingiz ham sizning ishingizni ko\'ra oladi.',
    examples: ['git push origin develop (develop yo\'lakchasiga jo\'natish)'],
    category: 'git'
  },
  {
    name: 'git merge',
    description: 'Ikki xil yo\'lakchani birlashtirish. Masalan, siz "develop" xonasida chiroyli narsa chizdingiz va endi uni asosiy "main" xonasidagi rasmga qo\'shmoqchisiz. "git merge" ularni bir-biriga chiroyli qilib yopishtirib beradi.',
    examples: ['git merge develop (developni hozirgi yo\'lakchaga qo\'shish)'],
    category: 'git'
  },
  {
    name: 'git status',
    description: 'Bu - "Tekshiruvchi". U sizga: "Savatda nimalar bor? Qaysi fayllar o\'zgardi? Qaysi yo\'lakchadasan?" degan savollarga javob beradi. Har doim ish boshlashdan oldin "Nima gaplar?" deb so\'rashga o\'xshaydi.',
    examples: ['git status'],
    category: 'git'
  }
];
