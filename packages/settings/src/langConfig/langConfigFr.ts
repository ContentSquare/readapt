import { ColoredOption, LangConfig } from '../models'

const phonemesFr: ColoredOption[] = [
  { key: '1', value: 'a', examples: ['ch<span>a</span>t', 'r<span>a</span>t'] },
  { key: '2', value: 'an', examples: ['gr<span>an</span>d'] },
  { key: '3', value: 'b', examples: ['<span>b</span>on'] },
  { key: '4', value: 'c', examples: ['<span>c</span>o<span>q</span>', '<span>q</span>ui'] },
  { key: '5', value: 'ch', examples: ['<span>ch</span>at'] },
  { key: '6', value: 'd', examples: ['<span>d</span>u'] },
  { key: '7', value: 'e', examples: ['just<span>e</span>ment'] },
  { key: '8', value: 'é', examples: ['bl<span>é</span>', '<span>e</span>t'] },
  { key: '9', value: 'è', examples: ['m<span>è</span>re', 'p<span>ai</span>re'] },
  { key: '10', value: 'eu', examples: ['j<span>e</span>', 'd<span>eu</span>x'] },
  { key: '11', value: 'f', examples: ['<span>f</span>il', '<span>ph</span>oto'] },
  { key: '12', value: 'g', examples: ['<span>g</span>are', '<span>g</span>uerre'] },
  { key: '13', value: 'gn', examples: ['vi<span>gn</span>e'] },
  { key: '14', value: 'gz', examples: ['e<span>x</span>act'] },
  { key: '15', value: 'i', examples: ['<span>i</span>l'] },
  { key: '16', value: 'in', examples: ['v<span>in</span>'] },
  { key: '17', value: 'j', examples: ['<span>j</span>oie', '<span>g</span>ens'] },
  { key: '18', value: 'ks', examples: ['te<span>x</span>te'] },
  { key: '19', value: 'l', examples: ['<span>l</span>i<span>l</span>as'] },
  { key: '20', value: 'm', examples: ['<span>m</span>a<span>m</span>ie'] },
  { key: '21', value: 'n', examples: ['<span>n</span>ul'] },
  { key: '22', value: 'ng', examples: ['campi<span>ng</span>'] },
  { key: '23', value: 'o', examples: ['c<span>o</span>mme'] },
  { key: '24', value: 'ô', examples: ['gr<span>o</span>s', 'b<span>eau</span>'] },
  { key: '25', value: 'oeu', examples: ['n<span>eu</span>f', '<span>œu</span>f'] },
  { key: '26', value: 'oi', examples: ['t<span>oi</span>', '<span>oi</span>seau'] },
  { key: '27', value: 'on', examples: ['b<span>on</span>'] },
  { key: '28', value: 'ou', examples: ['n<span>ou</span>s', 'f<span>ou</span>'] },
  { key: '29', value: 'p', examples: ['<span>p</span>a<span>p</span>a'] },
  { key: '30', value: 'r', examples: ['<span>r</span>at'] },
  { key: '31', value: 's', examples: ['<span>s</span>ur', '<span>ç</span>a', '<span>c</span>e'] },
  { key: '32', value: 't', examples: ['<span>t</span>u'] },
  { key: '33', value: 'u', examples: ['t<span>u</span>'] },
  { key: '34', value: 'un', examples: ['br<span>un</span>'] },
  { key: '35', value: 'v', examples: ['<span>v</span>élo'] },
  { key: '36', value: 'w', examples: ['<span>w</span>eb'] },
  { key: '37', value: 'y', examples: ['pai<span>ll</span>e', 'cra<span>y</span>on'] },
  { key: '38', value: 'z', examples: ['<span>z</span>oo', 'pè<span>s</span>e'] },
  { key: '39', value: 'iy', examples: ['fu<span>y</span>ard'] },
  { key: '40', value: 'tch', examples: ['<span>c</span>iao', '<span>ch</span>allenge'] },
  { key: '41', value: 'dg', examples: ['challen<span>g</span>e', '<span>j</span>ogging'] }
]

const lettersFr: ColoredOption[] = [
  { key: '1', value: 'b', examples: ['<span>b</span>on', 'au<span>b</span>e'] },
  { key: '2', value: 'd', examples: ['<span>d</span>u', 'per<span>d</span>u'] },
  { key: '3', value: 'p', examples: ['<span>p</span>lus, é<span>p</span>ée'] },
  { key: '4', value: 'q', examples: ['<span>q</span>uoi', 'bri<span>q</span>ue'] },
  { key: '5', value: 'u, ù', examples: ['<span>u</span>sée', 'r<span>u</span>se'] },
  { key: '6', value: 'n', examples: ['<span>n</span>o<span>n</span>', 'mi<span>n</span>e'] },
  { key: '7', value: 'm', examples: ['<span>m</span>a<span>m</span>an, â<span>m</span>e'] },
  { key: '8', value: 'v', examples: ['<span>v</span>ie', 'i<span>v</span>re'] },
  { key: '9', value: 'c', examples: ['<span>c</span>oq', 'é<span>c</span>u'] },
  { key: '10', value: 'ç', examples: ['<span>ç</span>a', 'fa<span>ç</span>on'] },
  { key: '11', value: 's', examples: ['<span>s</span>ûr', 'au<span>s</span><span>s</span>i'] },
  { key: '12', value: 'z', examples: ['<span>z</span>oo', 'crée<span>z</span>'] },
  { key: '13', value: 'a, à, â', examples: ['<span>â</span>me', 'p<span>a</span>s'] },
  { key: '14', value: 'e', examples: ['l<span>e</span>', 'm<span>e</span>r'] },
  { key: '15', value: 'é', examples: ['<span>é</span>t<span>é</span>, d<span>é</span>mis'] },
  { key: '16', value: 'è, ê', examples: ['<span>ê</span>tre', 'p<span>è</span>re'] },
  { key: '17', value: 'f', examples: ['<span>f</span>eu', 'o<span>ff</span>re'] },
  { key: '18', value: 'g', examples: ['<span>g</span>ai', 'ra<span>g</span>e'] },
  { key: '19', value: 'h', examples: ['<span>h</span>omme', 'p<span>h</span>oto'] },
  { key: '20', value: 'i, î', examples: ['<span>î</span>le', 'v<span>i</span>lle'] },
  { key: '21', value: 'j', examples: ['<span>j</span>eu', 'é<span>j</span>ecte'] },
  { key: '22', value: 'k', examples: ['<span>k</span>oala', 'o<span>k</span>'] },
  { key: '23', value: 'l', examples: ['<span>l</span>it', 'ai<span>l</span>e'] },
  { key: '24', value: 'o, ô', examples: ['<span>o</span>gre', 'tr<span>o</span>p'] },
  { key: '25', value: 'r', examples: ['<span>r</span>at', 'a<span>r</span>me'] },
  { key: '26', value: 't', examples: ['<span>t</span>on', 'au<span>t</span>re'] },
  { key: '27', value: 'w', examples: ['<span>w</span>agon'] },
  { key: '28', value: 'x', examples: ['te<span>x</span>te'] },
  { key: '29', value: 'y', examples: ['cra<span>y</span>on'] }
]

const textPreviewFr =
  "Voici un texte de démonstration. En effet il montrera l'effet des options sélectionnées. Il y a trois onglets de configuration. Prenez le temps de chercher la configuration qui vous aidera le mieux."

export const langConfigFr: LangConfig = {
  phonemeOptions: phonemesFr,
  letterOptions: lettersFr,
  textPreview: textPreviewFr
}
