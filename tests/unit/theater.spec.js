import {mount} from '@vue/test-utils'
import Theater from '@/views/Theater.vue'
import Section from '@/components/Section.vue'
import Legend from '@/components/Legend.vue'

const groups = [
  {
    "id": "+31611111111",
    "seats": [
      {
        "section": "main hall",
        "row": "1",
        "seat": "1"
      },
      {
        "section": "main hall",
        "row": "1",
        "seat": "2"
      }
    ]
  }
]
const layout = {
  "ranks": [
    "rank1"
  ],
  "sections": [
    {
      "name": "main hall",
      "rows": [
        {
          "row": "1",
          "seats": [
            {
              "seat": "1",
              "rank": "rank1"
            },
            {
              "seat": "2",
              "rank": "rank1"
            }
          ]
        }
      ]
    }
  ]
}

describe('Theater.vue', () => {
  it('renders props.msg when passed', () => {
    let wrapper = mount(Theater, {
      propsData: {layoutProp: layout, groupsProp: groups}
    })

    wrapper.vm.$nextTick(() => {
      // we wait for the view to mount
      const sections = wrapper.find('.sections')
      expect(sections.findAll(Section).length).toBe(1)
      const section = sections.findAll(Section).at(0)
      const colorGeneratedForGroup = section.vm.$props.section.rows['1'].seats['1'].groupColor
      const rankGeneratedForGroup = section.vm.$props.section.rows['1'].seats['1'].rankColor

      // check that the structure passed to section is well formatted
      expect(section.vm.$props.section.name).toBe('main hall')
      expect(section.vm.$props.section.rows).toBeInstanceOf(Object)
      expect(section.vm.$props.section.rows['1'].row).toBe('1')
      expect(section.vm.$props.section.rows['1'].seats['1'].groupId).toBe('+31611111111')
      expect(section.vm.$props.section.rows['1'].seats['1'].rank).toBe('rank1')
      expect(section.vm.$props.section.rows['1'].seats['1'].seat).toBe('1')
      expect(section.vm.$props.section.rows['1'].seats['2'].groupId).toBe('+31611111111')
      expect(section.vm.$props.section.rows['1'].seats['2'].rank).toBe('rank1')
      expect(section.vm.$props.section.rows['1'].seats['2'].seat).toBe('2')

      // check that the structure passed to legend is well formatted
      expect(wrapper.findAll(Legend).length).toBe(1)
      const legend = wrapper.find(Legend)
      // compare if the color match with the layout structure
      expect(legend.vm.$props.legendMap.groupColor['+31611111111']).toBe(colorGeneratedForGroup)
      expect(legend.vm.$props.legendMap.rankColor.rank1).toBe(rankGeneratedForGroup)
    })

  })
})
