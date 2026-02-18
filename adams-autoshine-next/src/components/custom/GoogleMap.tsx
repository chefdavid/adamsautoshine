interface GoogleMapProps {
  src: string;
  title?: string;
}

export function GoogleMap({
  src,
  title = "Adam's Autoshine location in Enid, Oklahoma",
}: GoogleMapProps) {
  return (
    <div className="rounded-3xl overflow-hidden border border-border-subtle">
      <iframe
        src={src}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  );
}
