---
title: "Magento(Varien lib) & PHP memory_limit -1 bug"
path: "/magentovarien-lib-php-memory_limit-1-bug/"
date: "2014-08-30T13:21:24.000Z"
date_updated:   2015-12-13T13:37:29.000Z
tags: magento
---

Last week an unusual bug really got me some time until i figured out.

Common symptoms are Magento not creating your product's images cache without a reason or when trying to upload product's image and an error says 'Memory limit reached'.

A lot of resources on the Internet says that you have to increase your PHP's memory limit. But when i checked my PHP's configuration i noticed that memory limit was to -1, which means that a s<a title="PHP Docs : Memory Limit" href="http://php.net/manual/en/ini.core.php#ini.memory-limit" target="_blank">cript is allowed to allocate all your available memory</a>. Hmm, that's interesting. Hmmm, that's interesting.

I followed the stacktrace and i found this (lib/Varien/Image/Adapter/Gd2.php):


```php
protected function _isMemoryLimitReached()
{
  $limit = $this-&gt;_convertToByte(ini_get('memory_limit'));
  $size = getimagesize($this-&gt;_fileName);
  $requiredMemory = $size[0] * $size[1] * 3;
  return (memory_get_usage(true) + $requiredMemory) &gt; $limit;
}

[...]

protected function _convertToByte($memoryValue)
{
  if (stripos($memoryValue, 'M') !== false) {
    return (int)$memoryValue * 1024 * 1024;
  } elseif (stripos($memoryValue, 'KB') !== false) {
    return (int)$memoryValue * 1024;
  }
  return (int)$memoryValue;
}
```


There you have it. The author here doesn't check for when memory_limit is set to -1. Instead he assumes that it will be always set to form of XXM or XXKB.

So in case you have bumped into the above symptoms check out that your PHP's memory limit is not set to infinite.


