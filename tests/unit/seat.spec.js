import {shallowMount} from '@vue/test-utils'
import Seat from '@/components/Seat.vue'

describe('Seat.vue', () => {
  it('Test the content of the Seat component', () => {
    const wrapper = shallowMount(Seat, {
      propsData: {
        seat: {groupColor: 'red', rankColor: 'blue', seat: 'seat2'},
        sectionName: 'sectionTest',
        rowName: 'row1'
      }
    })
    expect(wrapper.contains('img')).toBe(true)
    expect(wrapper.contains('div')).toBe(true)
    expect(wrapper.classes('seat')).toBe(true)

    //test style
    expect(wrapper.find('.seat').attributes().style).toBe("background-color: red; border-color: blue;");
  })
})
