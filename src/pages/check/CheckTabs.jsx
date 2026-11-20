// Step 7 check page (18 Nov 2026): every captured tab group state, live markup beside the kit.
// Each cell passes its captured state; labels and active tab come from the captured cell metadata.
import { Tabs, LIVE_TAB_GROUPS } from '../../components/Tabs.jsx'
import { TL } from '../../data/tabsLive.js'

const C = (g, s) => TL[`group${g}`].cells[s]

const CELLS = [
  [1, 'default', <Tabs group={1} state="default" activeIndex={C(1, 'default').activeIndex} tabs={C(1, 'default').labels} />],
  [1, 'active', <Tabs group={1} state="active" activeIndex={C(1, 'active').activeIndex} tabs={C(1, 'active').labels} />],
  [1, 'count_badge', <Tabs group={1} state="count_badge" activeIndex={C(1, 'count_badge').activeIndex} tabs={C(1, 'count_badge').labels} />],
  [1, 'overflow', <Tabs group={1} state="overflow" activeIndex={C(1, 'overflow').activeIndex} tabs={C(1, 'overflow').labels} />],
  [2, 'default', <Tabs group={2} state="default" activeIndex={C(2, 'default').activeIndex} tabs={C(2, 'default').labels} />],
  [2, 'active', <Tabs group={2} state="active" activeIndex={C(2, 'active').activeIndex} tabs={C(2, 'active').labels} />],
  [2, 'overflow', <Tabs group={2} state="overflow" activeIndex={C(2, 'overflow').activeIndex} tabs={C(2, 'overflow').labels} />],
  [3, 'default', <Tabs group={3} state="default" activeIndex={C(3, 'default').activeIndex} tabs={C(3, 'default').labels} />],
  [3, 'active', <Tabs group={3} state="active" activeIndex={C(3, 'active').activeIndex} tabs={C(3, 'active').labels} />],
  [3, 'count_badge', <Tabs group={3} state="count_badge" activeIndex={C(3, 'count_badge').activeIndex} tabs={C(3, 'count_badge').labels} />],
  [3, 'overflow', <Tabs group={3} state="overflow" activeIndex={C(3, 'overflow').activeIndex} tabs={C(3, 'overflow').labels} />],
  [4, 'default', <Tabs group={4} state="default" activeIndex={C(4, 'default').activeIndex} tabs={C(4, 'default').labels} />],
  [4, 'active', <Tabs group={4} state="active" activeIndex={C(4, 'active').activeIndex} tabs={C(4, 'active').labels} />],
  [4, 'overflow', <Tabs group={4} state="overflow" activeIndex={C(4, 'overflow').activeIndex} tabs={C(4, 'overflow').labels} />],
  [5, 'default', <Tabs group={5} state="default" activeIndex={C(5, 'default').activeIndex} tabs={C(5, 'default').labels} />],
  [5, 'active', <Tabs group={5} state="active" activeIndex={C(5, 'active').activeIndex} tabs={C(5, 'active').labels} />],
  [5, 'overflow', <Tabs group={5} state="overflow" activeIndex={C(5, 'overflow').activeIndex} tabs={C(5, 'overflow').labels} />],
  [6, 'default', <Tabs group={6} state="default" activeIndex={C(6, 'default').activeIndex} tabs={C(6, 'default').labels} />],
  [6, 'active', <Tabs group={6} state="active" activeIndex={C(6, 'active').activeIndex} tabs={C(6, 'active').labels} />],
  [6, 'overflow', <Tabs group={6} state="overflow" activeIndex={C(6, 'overflow').activeIndex} tabs={C(6, 'overflow').labels} />],
  [7, 'default', <Tabs group={7} state="default" activeIndex={C(7, 'default').activeIndex} tabs={C(7, 'default').labels} />],
  [7, 'active', <Tabs group={7} state="active" activeIndex={C(7, 'active').activeIndex} tabs={C(7, 'active').labels} />],
  [7, 'overflow', <Tabs group={7} state="overflow" activeIndex={C(7, 'overflow').activeIndex} tabs={C(7, 'overflow').labels} />],
  [8, 'default', <Tabs group={8} state="default" activeIndex={C(8, 'default').activeIndex} tabs={C(8, 'default').labels} />],
  [8, 'active', <Tabs group={8} state="active" activeIndex={C(8, 'active').activeIndex} tabs={C(8, 'active').labels} />],
  [8, 'overflow', <Tabs group={8} state="overflow" activeIndex={C(8, 'overflow').activeIndex} tabs={C(8, 'overflow').labels} />],
  [9, 'default', <Tabs group={9} state="default" activeIndex={C(9, 'default').activeIndex} tabs={C(9, 'default').labels} />],
  [9, 'active', <Tabs group={9} state="active" activeIndex={C(9, 'active').activeIndex} tabs={C(9, 'active').labels} />],
  [9, 'count_badge', <Tabs group={9} state="count_badge" activeIndex={C(9, 'count_badge').activeIndex} tabs={C(9, 'count_badge').labels} />],
  [9, 'overflow', <Tabs group={9} state="overflow" activeIndex={C(9, 'overflow').activeIndex} tabs={C(9, 'overflow').labels} />],
  [9, 'inside_drawer_modal', <Tabs group={9} state="inside_drawer_modal" activeIndex={C(9, 'inside_drawer_modal').activeIndex} tabs={C(9, 'inside_drawer_modal').labels} />],
  [10, 'default', <Tabs group={10} state="default" activeIndex={C(10, 'default').activeIndex} tabs={C(10, 'default').labels} />],
  [10, 'active', <Tabs group={10} state="active" activeIndex={C(10, 'active').activeIndex} tabs={C(10, 'active').labels} />],
  [10, 'overflow', <Tabs group={10} state="overflow" activeIndex={C(10, 'overflow').activeIndex} tabs={C(10, 'overflow').labels} />],
  [11, 'default', <Tabs group={11} state="default" activeIndex={C(11, 'default').activeIndex} tabs={C(11, 'default').labels} />],
  [11, 'active', <Tabs group={11} state="active" activeIndex={C(11, 'active').activeIndex} tabs={C(11, 'active').labels} />],
  [11, 'overflow', <Tabs group={11} state="overflow" activeIndex={C(11, 'overflow').activeIndex} tabs={C(11, 'overflow').labels} />],
  [11, 'inside_drawer_modal', <Tabs group={11} state="inside_drawer_modal" activeIndex={C(11, 'inside_drawer_modal').activeIndex} tabs={C(11, 'inside_drawer_modal').labels} />],
  [12, 'default', <Tabs group={12} state="default" activeIndex={C(12, 'default').activeIndex} tabs={C(12, 'default').labels} />],
  [12, 'active', <Tabs group={12} state="active" activeIndex={C(12, 'active').activeIndex} tabs={C(12, 'active').labels} />],
  [12, 'overflow', <Tabs group={12} state="overflow" activeIndex={C(12, 'overflow').activeIndex} tabs={C(12, 'overflow').labels} />],
  [13, 'default', <Tabs group={13} state="default" activeIndex={C(13, 'default').activeIndex} tabs={C(13, 'default').labels} />],
  [13, 'active', <Tabs group={13} state="active" activeIndex={C(13, 'active').activeIndex} tabs={C(13, 'active').labels} />],
  [13, 'inside_drawer_modal', <Tabs group={13} state="inside_drawer_modal" activeIndex={C(13, 'inside_drawer_modal').activeIndex} tabs={C(13, 'inside_drawer_modal').labels} />],
  [14, 'default', <Tabs group={14} state="default" activeIndex={C(14, 'default').activeIndex} tabs={C(14, 'default').labels} />],
  [14, 'active', <Tabs group={14} state="active" activeIndex={C(14, 'active').activeIndex} tabs={C(14, 'active').labels} />],
  [15, 'default', <Tabs group={15} state="default" activeIndex={C(15, 'default').activeIndex} tabs={C(15, 'default').labels} />],
  [15, 'active', <Tabs group={15} state="active" activeIndex={C(15, 'active').activeIndex} tabs={C(15, 'active').labels} />],
  [16, 'default', <Tabs group={16} state="default" activeIndex={C(16, 'default').activeIndex} tabs={C(16, 'default').labels} />],
  [16, 'active', <Tabs group={16} state="active" activeIndex={C(16, 'active').activeIndex} tabs={C(16, 'active').labels} />],
  [16, 'overflow', <Tabs group={16} state="overflow" activeIndex={C(16, 'overflow').activeIndex} tabs={C(16, 'overflow').labels} />],
  [17, 'default', <Tabs group={17} state="default" activeIndex={C(17, 'default').activeIndex} tabs={C(17, 'default').labels} />],
  [17, 'active', <Tabs group={17} state="active" activeIndex={C(17, 'active').activeIndex} tabs={C(17, 'active').labels} />],
  [17, 'overflow', <Tabs group={17} state="overflow" activeIndex={C(17, 'overflow').activeIndex} tabs={C(17, 'overflow').labels} />],
  [18, 'default', <Tabs group={18} state="default" activeIndex={C(18, 'default').activeIndex} tabs={C(18, 'default').labels} />],
  [18, 'active', <Tabs group={18} state="active" activeIndex={C(18, 'active').activeIndex} tabs={C(18, 'active').labels} />],
  [18, 'count_badge', <Tabs group={18} state="count_badge" activeIndex={C(18, 'count_badge').activeIndex} tabs={C(18, 'count_badge').labels} />],
  [19, 'default', <Tabs group={19} state="default" activeIndex={C(19, 'default').activeIndex} tabs={C(19, 'default').labels} />],
  [19, 'active', <Tabs group={19} state="active" activeIndex={C(19, 'active').activeIndex} tabs={C(19, 'active').labels} />],
  [19, 'count_badge', <Tabs group={19} state="count_badge" activeIndex={C(19, 'count_badge').activeIndex} tabs={C(19, 'count_badge').labels} />],
  [20, 'default', <Tabs group={20} state="default" activeIndex={C(20, 'default').activeIndex} tabs={C(20, 'default').labels} />],
  [20, 'active', <Tabs group={20} state="active" activeIndex={C(20, 'active').activeIndex} tabs={C(20, 'active').labels} />],
  [20, 'count_badge', <Tabs group={20} state="count_badge" activeIndex={C(20, 'count_badge').activeIndex} tabs={C(20, 'count_badge').labels} />],
  [21, 'default', <Tabs group={21} state="default" activeIndex={C(21, 'default').activeIndex} tabs={C(21, 'default').labels} />],
  [21, 'active', <Tabs group={21} state="active" activeIndex={C(21, 'active').activeIndex} tabs={C(21, 'active').labels} />],
  [21, 'count_badge', <Tabs group={21} state="count_badge" activeIndex={C(21, 'count_badge').activeIndex} tabs={C(21, 'count_badge').labels} />],
  [22, 'default', <Tabs group={22} state="default" activeIndex={C(22, 'default').activeIndex} tabs={C(22, 'default').labels} />],
  [22, 'active', <Tabs group={22} state="active" activeIndex={C(22, 'active').activeIndex} tabs={C(22, 'active').labels} />],
  [22, 'count_badge', <Tabs group={22} state="count_badge" activeIndex={C(22, 'count_badge').activeIndex} tabs={C(22, 'count_badge').labels} />],
  [23, 'default', <Tabs group={23} state="default" activeIndex={C(23, 'default').activeIndex} tabs={C(23, 'default').labels} />],
  [23, 'active', <Tabs group={23} state="active" activeIndex={C(23, 'active').activeIndex} tabs={C(23, 'active').labels} />],
  [23, 'disabled', <Tabs group={23} state="disabled" activeIndex={C(23, 'disabled').activeIndex} tabs={C(23, 'disabled').labels} />],
  [24, 'default', <Tabs group={24} state="default" activeIndex={C(24, 'default').activeIndex} tabs={C(24, 'default').labels} />],
  [24, 'active', <Tabs group={24} state="active" activeIndex={C(24, 'active').activeIndex} tabs={C(24, 'active').labels} />],
  [25, 'default', <Tabs group={25} state="default" activeIndex={C(25, 'default').activeIndex} tabs={C(25, 'default').labels} />],
  [25, 'active', <Tabs group={25} state="active" activeIndex={C(25, 'active').activeIndex} tabs={C(25, 'active').labels} />],
  [26, 'default', <Tabs group={26} state="default" activeIndex={C(26, 'default').activeIndex} tabs={C(26, 'default').labels} />],
  [26, 'active', <Tabs group={26} state="active" activeIndex={C(26, 'active').activeIndex} tabs={C(26, 'active').labels} />],
  [27, 'default', <Tabs group={27} state="default" activeIndex={C(27, 'default').activeIndex} tabs={C(27, 'default').labels} />],
  [27, 'active', <Tabs group={27} state="active" activeIndex={C(27, 'active').activeIndex} tabs={C(27, 'active').labels} />],
  [28, 'default', <Tabs group={28} state="default" activeIndex={C(28, 'default').activeIndex} tabs={C(28, 'default').labels} />],
  [28, 'active', <Tabs group={28} state="active" activeIndex={C(28, 'active').activeIndex} tabs={C(28, 'active').labels} />],
  [29, 'default', <Tabs group={29} state="default" activeIndex={C(29, 'default').activeIndex} tabs={C(29, 'default').labels} />],
  [29, 'active', <Tabs group={29} state="active" activeIndex={C(29, 'active').activeIndex} tabs={C(29, 'active').labels} />],
]

export default function CheckTabs() {
  return (
    <div className="bg-white p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h1 className="text-lg font-semibold text-gray-900 mb-4">Tabs: captured live markup, 18 Nov 2026</h1>
      {CELLS.map(([g, s, el]) => (
        <div key={`${g}__${s}`} className="flex gap-6 items-start border-b border-gray-200 py-3">
          <div className="w-40 text-xs text-gray-600 shrink-0">
            Group {g} · {s}
            <div className="text-gray-400">Look {TL[`group${g}`]?.look || '?'}</div>
            <div className="text-gray-400">Tag {TL[`group${g}`]?.tag || '?'}</div>
          </div>
          <div data-cell={`group${g}__${s}`} style={{ padding: 10, minHeight: 80 }}>{el}</div>
        </div>
      ))}
    </div>
  )
}
