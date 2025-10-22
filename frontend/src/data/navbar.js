import { RiQuestionAnswerLine, RiQuestionAnswerFill, RiStore3Line, RiStore3Fill, RiGiftLine, RiGiftFill } from "react-icons/ri";
import { MdSpaceDashboard, MdOutlineSpaceDashboard } from "react-icons/md";

const navList = [
  {
    label: "Overview",
    route: "/overview",
    ActiveIcon: MdSpaceDashboard,
    NoneActiveIcon: MdOutlineSpaceDashboard,
  }, {
    label: "Products",
    route: "/products",
    ActiveIcon: RiGiftFill,
    NoneActiveIcon: RiGiftLine,
  }, {
    label: "Stores",
    route: "/stores",
    ActiveIcon: RiStore3Fill,
    NoneActiveIcon: RiStore3Line,
  }, {
    label: "FAQs",
    route: "/faqs",
    ActiveIcon: RiQuestionAnswerFill,
    NoneActiveIcon: RiQuestionAnswerLine,
  }
]

export { navList };