/*
 *   Just returns a valid UUID, e.g
 *     uuid(); // 76306e1f-2614-4f95-ae14-b271127cc774
 *
 *       We use this to give tasks IDs. Why? Because UUIDs are fn awesome.
 *       */
function uuid() {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
          random = Math.random() * 16 | 0;
          if (i === 8 || i === 12 || i === 16 || i === 20) {
                  uuid += '-';
                }
          uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        }

    return uuid;
}

module.exports = {
  uuid
}