"""
文本分析模块
"""
from typing import List, Dict
import jieba.posseg
from collections import Counter
from api.config import pos2cn


class PosSegment:
    """
    中文词性标注和词频统计
    """

    def __init__(self, text: str,
                 user_words: List[str] = None,
                 stop_words: List[str] = None,
                 delete_punctuation: bool = False):
        """
        :param text: 文本
        :param user_words: 用户词典
        :param stop_words: 停用词
        :param delete_punctuation: 是否删除标点
        """
        self._text = text

        self.char_len = len(text)
        self.word_counts: int = 0  # 分词以后的词数目
        self.ner_counts: int = 0  # 实体数目
        self.delete_punctuation = delete_punctuation  # 是否去除常用标点
        self.punctuation = ",.;:'[]{}，。/；：--=+><【】?？《》!@#$%^&*()（）～、”|“"  # 标点符号

        self.user_words = user_words  # 用户定义词典
        self.stop_words = stop_words or list('的地得你我他了')  # 停用词字典

    def count_segment(self, most_common=20):
        """统计词性结果"""
        seg_count = self.segment()
        res_seg_count = Counter(seg_count).most_common(most_common)
        return [{'词性': pos2cn.get(k), '词性分布': v} for k, v in res_seg_count]

    def count_words(self, most_common=20):
        """统计词频 包含标点符号"""
        punctuation_count: Dict[str, int] = {}
        word_count = self.cut_word()
        self.word_counts = len(word_count)

        # 清除停用词
        for stop_word in self.stop_words:
            if stop_word in word_count:
                word_count.pop(stop_word)

        # 统计标点符号，并清除
        for item in self.punctuation:
            if item in word_count:
                punctuation_count[item] = word_count.pop(item)

        res_word_count = Counter(word_count)
        res_punctuation_count = Counter(punctuation_count).most_common(most_common)
        return [{'词名称': k, '词频分布': v} for k, v in res_word_count.most_common(most_common)], \
               [{'标点名称': k, '标点分布': v} for k, v in res_punctuation_count], \
               [{'词名称': k, '词频分布': v} for k, v in res_word_count.most_common(1000)]

    def segment(self):
        """词性标注"""
        import jieba
        jieba.enable_paddle()
        seg_count: Dict[str, int] = {}
        for word, seg in jieba.posseg.cut(self._text, use_paddle=True):

            if seg in seg_count:
                seg_count[seg] += 1
            else:
                seg_count[seg] = 1
        return seg_count

    def cut_word(self):
        """分词"""
        import jieba

        word_count: Dict[str, int] = {}

        if self.user_words:
            for word in self.user_words:
                jieba.add_word(word)

        for word in jieba.cut(self._text):
            if word in word_count:
                word_count[word] += 1
            else:
                word_count[word] = 1
        return word_count


if __name__ == '__main__':
    p = PosSegment(text="""疫情当前最需要的是全力以赴防控疫情、争分夺秒救治患者，少一些诿过推责的谎言、少一些敲诈勒索的讹诈。否则，不仅过诿不了、责推不掉，而且这种赤裸裸的“政治讹诈”将成为人类抗疫史上的一幕丑剧
　　如今病毒肆虐、疫情汹涌，美国一些政客玩起了“政治讹诈”的把戏。世界卫生组织向全球通报疫情后，美国一些政客一边幸灾乐祸，一边自以为是，拍胸脯、做保证，“一切没问题”“全在控制之中”。2月底，世卫组织总干事意有所指地警告“
    任何国家如果认为新冠病毒不会出现在自家门前，那将是一个致命的错误”，而美国一些政客却大谈“症状非常轻”“可以自愈”“会奇迹般消失”。实行不检测政策出来了，疾控中心“不公布”规定出台了，政策难协同，资金批不下，执行没有人，病人没地治——许多人十分不解，明明拥有全球最强大的医疗卫生系统，也有充分的时间做好应对准备，为何却导致疫情大暴发的局面，付出病例超百万、死亡超7万的惨重代价？让人感到十分痛惜。
　　美国政府应对不力，引发了众怒。于是，为了诿过推责，美国政客抛出了“中国隐瞒了疫情”“病毒出自中国武汉的一个实验室”一个又一个谣言，大肆鼓噪向中国“追责索赔”，各色人等彼此唱和，走马灯似地登台表演。证据何在？语焉不详！不光“甩锅”中国，他们还加大对世卫组织施压，诬称“偏袒中国”，不但暂停拨款，还威胁要审查世卫组织。这番""",
                   stop_words=['的', '得'])
    p.segment()
    print(f"词性：{p.count_segment()}\n词频：{p.count_words()}")
