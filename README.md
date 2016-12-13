# timing-safe-strcmp
Compare any strings in timing-safe manner

## (referenceString, actualString) ⇒ <code>bool</code>

Compares two strings/buffers for equality in timing-safe manner

**Kind**: Main export

| Param | Description |
| --- | --- |
| referenceString | `(string|Buffer)` |
| actualString | `(string|Buffer)` |

## .compareConstantLengthBuffers(buf1, buf2) => <code>bool</code>

Compare two buffers of equal length in timing-safe manner. Will use `crypto.timingSafeEqual` if possible, otherwise custom function.