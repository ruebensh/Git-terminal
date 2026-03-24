import { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  {
    id: 'ex-1',
    title: 'Birinchi qadam: Loyihani olish',
    description: 'Sizga birinchi vazifa: GitLab\'dagi loyihani o\'z kompyuteringizga ko\'chirib oling. Buning uchun "git clone" buyrug\'idan foydalaning.',
    initialFileSystem: {
      name: '/',
      type: 'directory',
      children: {
        'home': {
          name: 'home',
          type: 'directory',
          children: {
            'user': {
              name: 'user',
              type: 'directory',
              children: {}
            }
          }
        }
      }
    },
    goal: 'Loyihani "git clone https://gitlab.com/linux-learning/exercise-1" orqali ko\'chirib oling.',
    hint: 'Terminalga "git clone https://gitlab.com/linux-learning/exercise-1" deb yozing.',
    checkCompletion: (state) => {
      return state.history.some(cmd => cmd.includes('git clone'));
    }
  },
  {
    id: 'ex-2',
    title: 'Develop tarmog\'ida ishlash',
    description: 'School 21 qoidasiga ko\'ra, biz hech qachon "main" tarmog\'ida ishlamaymiz. Doim "develop" tarmog\'ini ochib, o\'sha yerda ishlashimiz kerak.',
    initialFileSystem: {
      name: '/',
      type: 'directory',
      children: {
        'home': {
          name: 'home',
          type: 'directory',
          children: {
            'user': {
              name: 'user',
              type: 'directory',
              children: {
                'my-project': {
                  name: 'my-project',
                  type: 'directory',
                  children: {
                    '.git': { name: '.git', type: 'directory', children: {} }
                  }
                }
              }
            }
          }
        }
      }
    },
    goal: 'Yangi "develop" tarmog\'ini yarating va unga o\'ting.',
    hint: '"git checkout -b develop" buyrug\'ini ishlating.',
    checkCompletion: (state) => {
      return state.currentBranch === 'develop';
    }
  },
  {
    id: 'ex-3',
    title: 'Fayl yaratish va jo\'natish',
    description: 'Endi "develop" tarmog\'ida turib, yangi "hello.c" faylini yarating, uni "add" qiling, "commit" qiling va serverga "push" qiling.',
    initialFileSystem: {
      name: '/',
      type: 'directory',
      children: {
        'home': {
          name: 'home',
          type: 'directory',
          children: {
            'user': {
              name: 'user',
              type: 'directory',
              children: {
                'my-project': {
                  name: 'my-project',
                  type: 'directory',
                  children: {
                    '.git': { name: '.git', type: 'directory', children: {} }
                  }
                }
              }
            }
          }
        }
      }
    },
    goal: 'hello.c faylini yaratib, uni develop tarmog\'iga push qiling.',
    hint: 'touch hello.c -> git add hello.c -> git commit -m "xabar" -> git push origin develop',
    checkCompletion: (state) => {
      return state.history.some(cmd => cmd.includes('git push origin develop'));
    }
  },
  {
    id: 'ex-4',
    title: 'ex00: Loyiha tuzilishi',
    description: 'School 21 loyihalarida tartib juda muhim. "ex00" degan papka oching, uning ichiga kiring va "main.c" faylini yarating.',
    initialFileSystem: {
      name: '/',
      type: 'directory',
      children: {
        'home': {
          name: 'home',
          type: 'directory',
          children: {
            'user': {
              name: 'user',
              type: 'directory',
              children: {}
            }
          }
        }
      }
    },
    goal: 'ex00 papkasini oching va ichida main.c yarating.',
    hint: 'mkdir ex00 -> cd ex00 -> touch main.c',
    checkCompletion: (state) => {
      const parts = state.currentPath.split('/');
      return parts.includes('ex00') && state.history.some(cmd => cmd.includes('touch main.c'));
    }
  },
  {
    id: 'ex-5',
    title: 'ex01: Kompilyatsiya (gcc)',
    description: 'Yozgan kodingizni ishlatish uchun uni tarjima (kompilyatsiya) qilish kerak. "main.c" faylini "gcc" yordamida tarjima qiling va natijaga "hello" deb nom bering.',
    initialFileSystem: {
      name: '/',
      type: 'directory',
      children: {
        'home': {
          name: 'home',
          type: 'directory',
          children: {
            'user': {
              name: 'user',
              type: 'directory',
              children: {
                'main.c': { name: 'main.c', type: 'file', content: 'int main(){}' }
              }
            }
          }
        }
      }
    },
    goal: 'gcc yordamida main.c ni "hello" nomi bilan kompilyatsiya qiling.',
    hint: 'gcc main.c -o hello',
    checkCompletion: (state) => {
      return state.history.some(cmd => cmd.includes('gcc') && cmd.includes('-o hello'));
    }
  },
  {
    id: 'ex-6',
    title: 'ex02: Birlashtirish (merge)',
    description: 'Siz "develop" tarmog\'ida hamma ishni bitirdingiz. Endi bu o\'zgarishlarni asosiy "main" tarmog\'iga qo\'shish kerak. Avval "main" ga o\'ting, keyin "develop" ni unga "merge" qiling.',
    initialFileSystem: {
      name: '/',
      type: 'directory',
      children: {
        'home': {
          name: 'home',
          type: 'directory',
          children: {
            'user': {
              name: 'user',
              type: 'directory',
              children: {
                '.git': { name: '.git', type: 'directory', children: {} }
              }
            }
          }
        }
      }
    },
    goal: 'main tarmog\'iga o\'tib, developni unga merge qiling.',
    hint: 'git checkout main -> git merge develop',
    checkCompletion: (state) => {
      return state.currentBranch === 'main' && state.history.some(cmd => cmd.includes('git merge develop'));
    }
  },
  {
    id: 'ex-7',
    title: 'ex03: Ruxsat berish (chmod)',
    description: 'Siz "dastur" degan fayl yaratdingiz, lekin uni ishlatishga ruxsat yo\'q. Uni ishga tushirish uchun "chmod +x" buyrug\'ini ishlating.',
    initialFileSystem: {
      name: '/',
      type: 'directory',
      children: {
        'home': {
          name: 'home',
          type: 'directory',
          children: {
            'user': {
              name: 'user',
              type: 'directory',
              children: {
                'dastur': { name: 'dastur', type: 'file', content: 'Binary content' }
              }
            }
          }
        }
      }
    },
    goal: '"dastur" fayliga ishlatish ruxsatini bering.',
    hint: 'chmod +x dastur',
    checkCompletion: (state) => {
      const dir = state.fileSystem.children?.home?.children?.user;
      const file = dir?.children?.dastur;
      return file?.permissions === '+x' || file?.permissions === '777';
    }
  },
  {
    id: 'ex-8',
    title: 'ex04: Dasturni ishlatish',
    description: 'Ruxsat berilgandan keyin dasturni ishga tushirish mumkin. Buning uchun "./" dan foydalaning. Masalan: "./dastur".',
    initialFileSystem: {
      name: '/',
      type: 'directory',
      children: {
        'home': {
          name: 'home',
          type: 'directory',
          children: {
            'user': {
              name: 'user',
              type: 'directory',
              children: {
                'dastur': { name: 'dastur', type: 'file', content: 'Binary content', permissions: '+x' }
              }
            }
          }
        }
      }
    },
    goal: '"dastur"ni ishga tushiring.',
    hint: './dastur',
    checkCompletion: (state) => {
      return state.history.some(cmd => cmd === './dastur');
    }
  },
  {
    id: 'ex-9',
    title: 'ex05: Nano tahrirlovchisi',
    description: 'Fayl ichiga matn yozish uchun "nano" dan foydalanamiz. "test.txt" faylini oching, ichiga "Salom" deb yozing va saqlang.',
    initialFileSystem: {
      name: '/',
      type: 'directory',
      children: {
        'home': {
          name: 'home',
          type: 'directory',
          children: {
            'user': {
              name: 'user',
              type: 'directory',
              children: {}
            }
          }
        }
      }
    },
    goal: 'nano orqali test.txt faylini yaratib, ichiga "Salom" deb yozing.',
    hint: 'nano test.txt -> matn yozing -> [Save] tugmasini bosing',
    checkCompletion: (state) => {
      const dir = state.fileSystem.children?.home?.children?.user;
      const file = dir?.children?.['test.txt'];
      return file?.type === 'file' && file.content?.includes('Salom');
    }
  }
];
