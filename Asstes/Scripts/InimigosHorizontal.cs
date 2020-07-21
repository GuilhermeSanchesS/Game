using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InimigosHorizontal : MonoBehaviour
{
    private bool colidde = false;

    private float move = -2;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        GetComponent<Rigidbody2D>().velocity = new Vector2(move, GetComponent<Rigidbody2D>().velocity.y);
        if (colidde)
        {
            Flip();
        }
    }

    private void Flip()
    {
        move *= -1;
        GetComponent<SpriteRenderer>().flipX = !GetComponent<SpriteRenderer>().flipX;
        colidde = false;
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Plataformas"))
        {
            colidde = true;
        }
    }
    void OnCollisionExit2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Plataformas"))
        {
            colidde = false;
        }
    }
}
