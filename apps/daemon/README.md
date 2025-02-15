# @repo/daemon

The Blue daemon is a service that runs in the background and manages container
lifecycle and networking for the entire Blue system.

You can enter into a REPL to interact with the agent in the container.

```sh
$ bun run src/index.ts repl

Welcome to the REPL!
Type 'help' for a list of commands.
✔ > ping
{
  "$typeName": "ping.PongResponse",
  "message": "pong"
}
✔ > exec {"command":"ls","args":["-la","/"]}
total 60
drwxr-xr-x   1 root root 4096 Feb 15 09:22 .
drwxr-xr-x   1 root root 4096 Feb 15 09:22 ..
-rwxr-xr-x   1 root root    0 Feb 15 09:22 .dockerenv
drwxr-xr-x   1 root root 4096 Feb 15 09:14 app
lrwxrwxrwx   1 root root    7 Jan 26 02:16 bin -> usr/bin
drwxr-xr-x   2 root root 4096 Apr 18  2022 boot
drwxr-xr-x   5 root root  340 Feb 15 09:22 dev
drwxr-xr-x   1 root root 4096 Feb 15 09:22 etc
drwxr-xr-x   2 root root 4096 Apr 18  2022 home
lrwxrwxrwx   1 root root    7 Jan 26 02:16 lib -> usr/lib
drwxr-xr-x   2 root root 4096 Jan 26 02:16 media
drwxr-xr-x   2 root root 4096 Jan 26 02:16 mnt
drwxr-xr-x   2 root root 4096 Jan 26 02:16 opt
dr-xr-xr-x 235 root root    0 Feb 15 09:22 proc
drwx------   2 root root 4096 Jan 26 02:23 root
drwxr-xr-x   5 root root 4096 Jan 26 02:23 run
lrwxrwxrwx   1 root root    8 Jan 26 02:16 sbin -> usr/sbin
drwxr-xr-x   2 root root 4096 Jan 26 02:16 srv
dr-xr-xr-x  11 root root    0 Feb 15 09:22 sys
drwxrwxrwt   2 root root 4096 Jan 26 02:23 tmp
drwxr-xr-x  11 root root 4096 Jan 26 02:16 usr
drwxr-xr-x  11 root root 4096 Jan 26 02:23 var
? >
```
