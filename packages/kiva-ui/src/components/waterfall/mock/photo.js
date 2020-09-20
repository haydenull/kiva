export default {
  delay: 3000,
  success(req, res, Mock) {
    const { page } = req.query
    const Random = Mock.Random
    Random.extend({
      pic: function() {
        const picSize = [
          '300x500', '250x250', '240x400', '336x800',
          '180x370', '300x420', '460x700', '234x400',
          '650x660', '120x200', '120x240', '120x210',
          '340x340', '350x380', '160x300', '190x400',
          '300x510',
        ]
        const size = this.pick(picSize)
        return {
          url: `https://source.unsplash.com/random/${size}`,
          size,
        }
      }
    })

    const data = Mock.mock({
      page: Number(page),
      totalPage: 6,
      'list|10': [
        {
          'id|10000-99999': 10000,
          pic: '@pic',
        }
      ]
    })
    res.json(data)
  },
}
