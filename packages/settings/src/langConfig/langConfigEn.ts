import { ColoredOption, LangConfig } from '../models'

export const phonemesEn: ColoredOption[] = [
  { key: '7', value: 'b', examples: ['<span>b</span>ear', '<span>b</span>ind'] },
  { key: '8', value: 'ch', examples: ['<span>ch</span>air', '<span>ch</span>urch'] },
  { key: '9', value: 'd', examples: ['<span>d</span>oubted', '<span>d</span>ay'] },
  { key: '10', value: 'dh', examples: ['<span>th</span>at', 'lea<span>th</span>er'] },
  { key: '12', value: 'er', examples: ['h<span>ur</span>t', 'b<span>ir</span>d'] },
  { key: '13', value: 'ey', examples: ['<span>ei</span>ght', 'st<span>ea</span>k'] },
  { key: '14', value: 'f', examples: ['gra<span>ph</span>', '<span>f</span>ight'] },
  { key: '15', value: 'g', examples: ['<span>g</span>uy', '<span>g</span>reen'] },
  { key: '17', value: 'ih', examples: ['w<span>i</span>n', 'f<span>ie</span>rce'] },
  { key: '18', value: 'iy', examples: ['b<span>ea</span>t', 'w<span>ee</span>k'] },
  { key: '19', value: 'jh', examples: ['a<span>dj</span>ust', '<span>g</span>ym'] },
  { key: '20', value: 'k', examples: ['<span>k</span>ey', 'dis<span>c</span>'] },
  { key: '21', value: 'l', examples: ['bott<span>l</span>e', '<span>l</span>ate'] },
  { key: '22', value: 'm', examples: ['autu<span>m</span>n', '<span>m</span>u<span>m</span>'] },
  { key: '23', value: 'n', examples: ['<span>n</span>oo<span>n</span>', '<span>n</span>et'] },
  { key: '24', value: 'ng', examples: ['si<span>ng</span>er', 'to<span>ng</span>ue'] },
  { key: '27', value: 'p', examples: ['<span>p</span>rom<span>p</span>t', 'dee<span>p</span>'] },
  { key: '28', value: 'r', examples: ['w<span>r</span>ite', 'whe<span>r</span>e'] },
  { key: '29', value: 's', examples: ['<span>s</span>a<span>ss</span>y', 'grea<span>s</span>y'] },
  { key: '30', value: 'sh', examples: ['<span>sh</span>e', 'blemi<span>sh</span>'] },
  { key: '31', value: 't', examples: ['look<span>ed</span>', 'li<span>tt</span>le'] },
  { key: '32', value: 'th', examples: ['<span>th</span>ing', '<span>th</span>ursday'] },
  { key: '35', value: 'v', examples: ['o<span>f</span>', 'ha<span>v</span>e'] },
  { key: '36', value: 'w', examples: ['<span>w</span>ant', 'q<span>u</span>een'] },
  { key: '37', value: 'y', examples: ['<span>y</span>ell', '<span>y</span>acht'] },
  { key: '38', value: 'z', examples: ['<span>z</span>oo', 'new<span>s</span>'] },
  { key: '39', value: 'zh', examples: ['a<span>s</span>ia', 'plea<span>s</span>ure'] },
  { key: '1', value: 'aa', examples: ['<span>o</span>dd', '<span>f</span>ather'] },
  { key: '2', value: 'ae', examples: ['f<span>a</span>st', '<span>a</span>t'] },
  { key: '3', value: 'ah', examples: ['s<span>u</span>n', 'c<span>ou</span>ntry'] },
  { key: '4', value: 'ao', examples: ['<span>o</span>ff', 'l<span>aw</span>'] },
  { key: '5', value: 'aw', examples: ['h<span>ow</span>', 'pl<span>ou</span>gh'] },
  { key: '6', value: 'ay', examples: ['wh<span>y</span>', 'h<span>i</span>de'] },
  { key: '11', value: 'eh', examples: ['b<span>ea</span>r', 'p<span>a</span>rent'] },
  { key: '16', value: 'hh', examples: ['<span>h</span>e', '<span>h</span>eight'] },
  { key: '25', value: 'ow', examples: ['b<span>oa</span>t', 'sh<span>ow</span>'] },
  { key: '26', value: 'oy', examples: ['b<span>o</span>y', 'b<span>oi</span>l'] },
  { key: '33', value: 'uh', examples: ['h<span>oo</span>k', 'c<span>ou</span>ld'] },
  { key: '34', value: 'uw', examples: ['n<span>ew</span>', 'f<span>oo</span>d'] }
]

export const lettersEn: ColoredOption[] = [
  { key: '1', value: 'b', examples: ['<span>b</span>ier', '<span>b</span>a<span>b</span>y'] },
  { key: '2', value: 'd', examples: ['<span>d</span>one', '<span>d</span>oo<span>d</span>le'] },
  { key: '3', value: 'p', examples: ['<span>p</span>lus', '<span>p</span>a<span>p</span>er'] },
  { key: '4', value: 'q', examples: ['<span>q</span>uote', '<span>q</span>ueen'] },
  { key: '5', value: 'k', examples: ['<span>k</span>oala', 'coo<span>k</span>'] },
  { key: '6', value: 'c', examples: ['a<span>c</span><span>c</span>use', 'stu<span>c</span>k'] },
  { key: '7', value: 'n', examples: ['<span>n</span>a<span>n</span><span>n</span>y', 'mi<span>n</span>e'] },
  { key: '8', value: 'm', examples: ['<span>m</span>u<span>m</span>', 'wo<span>m</span>en'] },
  { key: '9', value: 'v', examples: ['<span>v</span>eil', 'li<span>v</span>er'] },
  { key: '10', value: 's', examples: ['<span>s</span>ure', 'di<span>s</span>mi<span>s</span><span>s</span>'] },
  { key: '11', value: 'z', examples: ['<span>z</span>oo', 'pu<span>z</span><span>z</span>le'] },
  { key: '12', value: 'a', examples: ['p<span>a</span>ss<span>a</span>ge', 'h<span>a</span>m'] },
  { key: '13', value: 'e', examples: ['th<span>e</span>n', 'd<span>e</span><span>e</span>p'] },
  { key: '14', value: 'f', examples: ['<span>f</span>ire', 'o<span>f</span><span>f</span>er'] },
  { key: '15', value: 'g', examples: ['<span>g</span>enre', 'bu<span>g</span><span>g</span>y'] },
  { key: '16', value: 'h', examples: ['<span>h</span>ome', 'p<span>h</span>otograp<span>h</span>'] },
  { key: '17', value: 'i', examples: ['c<span>i</span>ty', 'an<span>i</span>mal'] },
  { key: '18', value: 'j', examples: ['<span>j</span>ob', 're<span>j</span>ected'] },
  { key: '19', value: 'u', examples: ['<span>u</span>sed', 'cr<span>u</span>ise'] },
  { key: '20', value: 'l', examples: ['<span>l</span>eve<span>l</span>', 'ta<span>l</span><span>l</span>'] },
  { key: '21', value: 'o', examples: ['c<span>o</span><span>o</span>l', 't<span>o</span>p'] },
  { key: '22', value: 'r', examples: ['<span>r</span>ada<span>r</span>', 'be<span>r</span><span>r</span>y'] },
  { key: '23', value: 't', examples: ['<span>t</span>o<span>t</span>al', 'o<span>t</span>her'] },
  { key: '24', value: 'w', examples: ['<span>w</span>agon', '<span>w</span>ave'] },
  { key: '25', value: 'x', examples: ['te<span>x</span>t', 'e<span>x</span>it'] },
  { key: '26', value: 'y', examples: ['cra<span>y</span>on', '<span>y</span>ellow'] }
]

export const textPreviewEn =
  '<p>The hungry purple dinosaur ate the kind, zingy fox, the jabbering crab, and the mad whale and started vending and quacking. The quick brown fox jumps over the lazy dog.</p>'

export const langConfigEn: LangConfig = {
  phonemeOptions: phonemesEn,
  letterOptions: lettersEn,
  textPreview: textPreviewEn
}
