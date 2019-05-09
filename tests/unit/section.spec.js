import {shallowMount, mount} from '@vue/test-utils'
import Section from '@/components/Section.vue'
import Row from '@/components/Row.vue'
import Seat from '@/components/Seat.vue'

describe('Section.vue', () => {
  it('Test the content of the Section component', () => {
    const wrapper = mount(Section, {
      propsData: {
        section: {
          name:'sectionTest',
          rows: {
            "1": {
              row: "row1",
              seats: {
                "1": {groupColor: 'red', rankColor: 'blue', seat: 'seat1'},
                "2": {groupColor: 'red', rankColor: 'blue', seat: 'seat2'}
              }
            }
          }
        }
      }
    })
    expect(wrapper.contains('h2')).toBe(true)
    expect(wrapper.find('h2').text()).toBe('sectionTest')
    expect(wrapper.findAll(Row).length).toBe(1)
    expect(wrapper.findAll(Seat).length).toBe(2)

  })
})
