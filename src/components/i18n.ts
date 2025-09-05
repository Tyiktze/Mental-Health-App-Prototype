// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        settings: "Settings",
        darkMode: "Dark Mode",
        fontSize: "Font Size",
        language: "Language",
        notifications: "Enable Notifications",
        compactMode: "Compact Mode",
        reset: "Reset to Defaults",
        dailyQuotes: "Daily Quotes",
        quoteBy: "-{{author}}",
        quotes: {
          quote1: "The only way to do great work is to love what you do",
          quote2: "Believe you can and you're halfway there",
          quote3: "Success is not final, failure is not fatal: it is the courage to continue that counts",
          quote4: "The future belongs to those who believe in the beauty of their dreams",
          quote5: "super idol de xiao rong dou mei ni de tian"
        },
        more: {
          title: "More",
          privacyPolicyTitle: "Privacy Policy",
          privacyPolicyText: "We respect your privacy. This app does not share your data with third parties.",
          termsTitle: "Terms & Conditions",
          termsText: "By using this app, you agree to use it responsibly and not for harmful purposes."
        },
        bottom: {
          home: "Home",
          add: "Add",
          settings: "Settings",
          more: "More",
        },
        functionPanel: {
          addNewApp: 'Add a new app at the <1>Add</1> button!'
        },
        navigation: {
          profile: "Profile",
          logout: "Logout",
          search: "Search"
        },
        addModal: {
          addNew: "Add New App",
          cancel: "Cancel"
        }
      }
    },
    zh: {
      translation: {
        settings: "设置",
        darkMode: "深色模式",
        fontSize: "字体大小",
        language: "语言",
        notifications: "启用通知",
        compactMode: "紧凑模式",
        reset: "恢复默认",
        dailyQuotes: "每日名言",
        quoteBy: "-{{author}}",
        quotes: {
          quote1: "做伟大工作的唯一方法是热爱你所做的事",
          quote2: "相信你能做到，你就已经成功了一半",
          quote3: "成功不是终点，失败也并非致命：重要的是继续前进的勇气",
          quote4: "未来属于相信梦想之美的人",
          quote5: "super idol 的笑容都没你的甜"
        },
        more: {
          title: "更多",
          privacyPolicyTitle: "隐私政策",
          privacyPolicyText: "我们尊重您的隐私。本应用不会与第三方分享您的数据。",
          termsTitle: "条款和条件",
          termsText: "使用本应用即表示您同意负责任地使用，而不是用于有害目的。"
        },
        bottom: {
          home: "首页",
          add: "添加",
          settings: "设置",
          more: "更多",
        },
        functionPanel: {
          addNewApp: '点击<1>添加</1>按钮以添加新应用'
        },
        navigation: {
          profile: "个人资料",
          logout: "登出",
          search: "搜索"
        },
        addModal: {
          addNew: "添加新应用",
          cancel: "取消"
        }
      }
    },
    es: {
      translation: {
        settings: "Configuración",
        darkMode: "Modo oscuro",
        fontSize: "Tamaño de fuente",
        language: "Idioma",
        notifications: "Habilitar notificaciones",
        compactMode: "Modo compacto",
        reset: "Restablecer valores predeterminados",
        dailyQuotes: "Frases del día",
        quoteBy: "-{{author}}",
        quotes: {
          quote1: "La única manera de hacer un gran trabajo es amar lo que haces",
          quote2: "Cree que puedes y ya estarás a mitad de camino",
          quote3: "El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el coraje de continuar",
          quote4: "El futuro pertenece a quienes creen en la belleza de sus sueños"
        },
        more: {
          title: "Más",
          privacyPolicyTitle: "Política de privacidad",
          privacyPolicyText: "Respetamos tu privacidad. Esta aplicación no comparte tus datos con terceros.",
          termsTitle: "Términos y condiciones",
          termsText: "Al usar esta aplicación, aceptas usarla de manera responsable y no con fines dañinos."
        },
        bottom: {
          home: "Accueil",
          add: "Ajouter",
          settings: "Paramètres",
          more: "Plus",
        },
        functionPanel: {
          addNewApp: '¡Agrega una nueva app usando el botón <1>Añadir</1>!'
        },
        navigation: {
          profile: "Perfil",
          logout: "Cerrar sesión",
          search: "Buscar"
        },
        addModal: {
          addNew: "Agregar nueva aplicación",
          cancel: "Cancelar"
        }
      }
    },
    fr: {
      translation: {
        settings: "Paramètres",
        darkMode: "Mode sombre",
        fontSize: "Taille de police",
        language: "Langue",
        notifications: "Activer les notifications",
        compactMode: "Mode compact",
        reset: "Réinitialiser les paramètres par défaut",
        dailyQuotes: "Citations du jour",
        quoteBy: "-{{author}}",
        quotes: {
          quote1: "La seule façon de faire du bon travail est d’aimer ce que vous faites",
          quote2: "Croyez que vous pouvez et vous êtes déjà à mi-chemin",
          quote3: "Le succès n’est pas final, l’échec n’est pas fatal : c’est le courage de continuer qui compte",
          quote4: "L’avenir appartient à ceux qui croient en la beauté de leurs rêves"
        },
        bottom: {
          home: "Accueil",
            add: "Ajouter",
          settings: "Paramètres",
          more: "Plus",
        },
        functionPanel: {
          addNewApp: 'Ajoutez une nouvelle application en utilisant le bouton <1>Ajouter</1> !'
        },
        navigation: {
          profile: "Profil",
          logout: "Déconnexion",
          search: "Rechercher"
        },
        addModal: {
          addNew: "Ajouter une nouvelle application",
          cancel: "Annuler"
        }
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
