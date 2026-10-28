# Static deployment with Caddy

This repository prepares future self-hosting of `raylonkai.dev` on Linux.
Nothing in this task installs Caddy, changes system configuration, starts a
service, edits DNS, opens ports, or deploys the site. Server commands below are
future operator instructions, not actions already performed.

## Build and verify

From a clean checkout of the intended commit, using the committed Bun version:

```sh
bun install --frozen-lockfile
bun run typecheck
bun run lint
bun run format:check
bun run test
bun run build
```

Vite creates `dist/index.html` and content-hashed JavaScript/CSS under
`dist/assets/`. Future `public/` files are copied into `dist/`. Inspect the artifact
and deploy only its contents, never the repository, `.git`, `.env` files, or
`node_modules`. Keep the commit ID, build environment, and artifact checksums with
the release record. Public `VITE_` variables are fixed during compilation;
changing them requires a new build and must never expose secrets.

Use `bun run preview` for a loopback-only production preview. Check each page by
direct URL and refresh, then navigation, browser history, 404 recovery, and Vim
shortcuts. Vite preview verifies the application, not Caddy's routing or headers.
The production machine needs Caddy and static files; it needs no Bun/Node process
unless deliberately chosen as the build machine.

## Proposed server paths

```text
/srv/raylonkai.dev/
├── releases/
│   ├── <previous-release>/    # complete dist contents
│   └── <new-release>/         # complete dist contents
├── shared/
│   └── assets/                # retained content-hashed assets from releases
└── current -> releases/<active-release>
```

Use unique release IDs, for example a UTC build timestamp plus commit ID. Upload
a complete release before activation; never build or sync into `current` in place.
The `current` symlink and its temporary replacement must share a filesystem for
atomic replacement. These paths are a proposed convention, not existing directories
created by this task. If changing them, update both Caddy roots and this procedure.

The deployment account owns publication. The Caddy service account needs read
access to files and directory traversal through every parent and symlink target,
not write access to releases. Public build files commonly use mode 0644 and
directories 0755; review ownership for the chosen server. Keep the site under
`/srv`, independent of a developer home and its service-manager restrictions.
Only publish trusted artifacts: symlinks inside the served tree can expose files
outside it. Caddy's [file-server documentation](https://caddyserver.com/docs/caddyfile/directives/file_server)
describes this boundary.

## Caddy configuration behavior

The root [Caddyfile](../Caddyfile) is a Caddy 2 configuration for the apex hostname
`raylonkai.dev`. Review it with the actual installed Caddy version before use.

- Compression uses supported zstd/gzip negotiation; access logs use Caddy's
  default output, captured by journald when run with the standard service.
- `/assets/*` preserves its path and reads from `shared/assets/`. Existing assets
  receive a one-year immutable cache policy. Missing assets receive a real file
  error rather than HTML, and the existence matcher avoids immutable headers on
  nonexistent files. Keep this namespace exclusively for versioned build assets.
- Other requests read from `current`, falling back to `index.html` for client
  routes. These responses use `Cache-Control: no-cache`, allowing storage but
  requiring revalidation before reuse. This also covers unhashed public files.
- `X-Content-Type-Options: nosniff` preserves MIME handling. There is no directory
  browsing directive, reverse proxy, backend, or additional content framework.

The two `handle` branches are mutually exclusive; the asset branch cannot fall
through to the HTML fallback. See Caddy's [handle reference](https://caddyserver.com/docs/caddyfile/directives/handle),
[file matcher](https://caddyserver.com/docs/caddyfile/matchers#file), and
[header reference](https://caddyserver.com/docs/caddyfile/directives/header).
The page fallback follows its [SPA pattern](https://caddyserver.com/docs/caddyfile/patterns#single-page-apps-spas).
Unknown application paths display React's 404 view with an HTTP 200 document
response; this does not provide server-side 404 status for crawlers. Missing
`/assets/` files are different: their HTTP status must be 404.

## DNS, HTTPS, and connectivity

Point the apex A record at the server's reachable public IPv4 address. Publish an
AAAA record only if IPv6 actually routes to this server with working ingress;
stale records can send some clients or certificate validation to the wrong host.
Verify authoritative DNS and public resolution before enabling service. If the
address changes, plan DNS updates rather than assuming the address is permanent.
This configuration does not serve or redirect `www.raylonkai.dev`; add that name,
DNS, and redirect configuration only if wanted.

Caddy obtains and renews public certificates for the configured domain and
redirects HTTP to HTTPS. Its standard setup needs correct A/AAAA records, publicly
reachable ports 80/443, permission to bind those ports, and persistent writable
certificate storage. Restrictive CAA records must allow the selected certificate
issuer. Preserve Caddy's state across upgrades and restarts; do not discard it on
each release. See [automatic HTTPS](https://caddyserver.com/docs/automatic-https).

For a typical router/NAT setup, later arrange TCP 80 and 443 forwarding to a
stable LAN address for the server, and permit those ports through router, host,
and provider firewalls. UDP 443 is optional for HTTP/3; TCP 443 still serves HTTPS.
IPv6 generally needs a suitable firewall rule rather than IPv4-style NAT forwarding.
Check public reachability from outside the LAN, not just via router hairpin access.
CGNAT or ISP port blocking may prevent this direct hosting plan; resolve the
ingress approach before deployment. Keep the administration interface on loopback.

Certificate issuance also needs outbound DNS and HTTPS connectivity. DNS-based
certificate challenges are a possible future alternative, requiring provider
configuration and credentials; they do not themselves make a private web server
reachable to visitors. No DNS provider integration is introduced here.

## Configuration validation and future systemd integration

Once Caddy is installed separately, inspect and validate the repository template:

```sh
caddy version
caddy fmt --diff Caddyfile
caddy adapt --config Caddyfile --adapter caddyfile --pretty
caddy validate --config Caddyfile --adapter caddyfile
```

Review formatting differences; adaptation is not a substitute for validation.
Validation alone does not prove DNS, certificates, file permissions, HTTP
behavior, or external reachability. See the [command-line reference](https://caddyserver.com/docs/command-line).

At actual server setup, prefer the distribution's official Caddy systemd unit
rather than creating a competing service. Inspect its user, configuration path,
`ExecStart`, `ExecReload`, storage location, and hardening. The common Caddyfile
path is `/etc/caddy/Caddyfile`; the repository copy is not loaded automatically.
Validate the installed configuration with the service user's permissions before
activation. Preserve existing virtual hosts when integrating this site.

Future operations, after separate server setup and authorization:

```sh
systemctl status caddy
journalctl -u caddy --no-pager -n 100
sudo -u caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
sudo systemctl reload caddy
```

Use a graceful reload for configuration changes. Switching static releases
under the same roots needs no Caddy restart or reload. Service startup, enablement,
unit changes, permissions, and firewall changes are future operations, not part
of this repository task. See Caddy's [Linux service guidance](https://caddyserver.com/docs/running).

## Publish a release

1. Build and verify a specific commit; record its artifact checksum and public
   build-time settings. Retain the complete artifact for reproducible rollback.
2. Transfer the artifact to a new `releases/<release-id>/` directory. Check
   transfer checksums and Caddy read/traverse permissions before activation.
3. Publish every `assets/` file to `shared/assets/` before switching HTML. Upload
   each new asset to a temporary filename and rename it atomically into place.
   Keep identical existing files; if the same pathname has different bytes,
   stop and investigate instead of overwriting cached content. Do not use a
   synchronization option that deletes old shared assets.
4. Verify that every asset referenced by the release, including dynamically
   imported page chunks, is available in the shared store. Record the previous
   `current` symlink target for rollback.
5. Atomically replace `current` only after the release and assets are complete.
   The following illustrates activation on a GNU/Linux server. Substitute the
   validated release ID; no such command was executed during this task.

   ```sh
   deploy_root=/srv/raylonkai.dev
   release_id=REPLACE_WITH_VALIDATED_RELEASE_ID
   test -f "$deploy_root/releases/$release_id/index.html" &&
     ln -s "releases/$release_id" "$deploy_root/current.next" &&
     mv -T "$deploy_root/current.next" "$deploy_root/current"
   ```

   An existing `current.next` makes `ln` fail; investigate it rather than replacing
   it blindly. Serialize deployments so two publications cannot race.

6. Run the HTTP and browser checks below from outside the LAN, and inspect logs.
   Record the activation time, commit, active target, and results in the devlog.

The shared asset store protects tabs that loaded earlier HTML and later request
a lazy chunk, as well as tabs opened just before a rollback. Keep assets from
both forward and rollback releases available. Initially retain hashed assets
indefinitely. Before garbage collection, define a supported open-tab lifetime
and recovery strategy; checking references from retained releases alone does not
prove old browser tabs have stopped requesting their assets. Reserve stable
unhashed filenames for resources whose compatibility across releases is understood.

## Verify deployment and rollback

After Caddy is configured and running, verify these expected results:

| Request or check                                           | Expected result                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| `http://raylonkai.dev/`                                    | Redirect to HTTPS                                             |
| `https://raylonkai.dev/`                                   | Valid public certificate and HTML with revalidation policy    |
| Direct `/about`, `/projects`, `/lab`, `/notes` and refresh | HTML loads, then correct React page                           |
| Unknown application path                                   | React 404 view; document HTTP 200                             |
| An actual release JS/CSS asset                             | Correct bytes and MIME type, HTTP 200, immutable cache policy |
| `/assets/definitely-missing.js`                            | HTTP 404; no HTML fallback or one-year immutable policy       |
| Previously published lazy asset URL                        | Still fetchable after deployment and rollback                 |
| Links, history, skip link, Vim keys and switch             | Same behavior as the local production preview                 |

Inspect headers and redirects with `curl -I` using the actual URLs. Check page
rendering and lazy loading in a browser as well; HTTP 200 alone is insufficient.
Test a transition from an old open tab after activation and again after rollback.

To roll back, identify a known-good retained release and verify all its assets
remain in `shared/assets/`. Use the same atomic symlink replacement with that
release ID, then repeat verification. A rollback is a new publication event:
record its reason, time, source/target releases, and results. Leave assets from
the rolled-back release available for clients that already loaded them. If the
Caddyfile itself caused the issue, restore the previous known-good configuration,
validate it, and gracefully reload separately.

## Validation status for this preparation

Caddy was not present on `PATH` during task 8. Its formatter, adapter, validator,
live HTTP behavior, certificate issuance, and systemd integration could not be
run here. The template was reviewed against official documentation; the native
checks and deployment verification above remain required on the chosen server.
No production DNS, connectivity, file ownership, or certificate readiness has
been verified. Actual local command results are recorded in `docs/DEVLOG.md`.
